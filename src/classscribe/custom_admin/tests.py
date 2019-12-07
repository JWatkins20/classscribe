from django.test import TestCase, Client
from .models import Course

class CourseTests(TestCase):

    def setUp(self):
        Course.objects.create(
            room="testRoom",
            time="testTime",
            name="testName",
            building="testBuilding",
            professorID="testProfessorID",
            lamp_serial="testLamp_serial123",
            semester="Fall 2019"
        )
        Course.objects.create(
            room="testRoom1",
            time="testTime",
            name="test Name",
            building="testBuilding",
            professorID="testProfessorID",
            lamp_serial="testLamp_serial",
            semester="Fall 2019"
        )

    def test_finds_course(self):
        found_course = None
        found_course = Course.objects.get(
            room="testRoom",
            time="testTime",
            name="testName",
            building="testBuilding",
            professorID="testProfessorID",
            lamp_serial="testLamp_serial123",
            semester="Fall 2019"
        )
        self.assertNotEqual(found_course, None)

    def test_edit_course_finds_course(self):
        c = Client()
        response = c.get('/courses/edit/Fall 2019/testName/testBuilding/testRoom/testTime')
        self.assertEqual(response.status_code, 200)

    def test_edit_course_finds_course_with_space(self):
        c = Client()
        response = c.get('/courses/edit/Fall 2019/test Name/testBuilding/testRoom1/testTime')
        self.assertEqual(response.status_code, 200)

    def test_edit_course_fails_to_find_course(self):
        c = Client()
        response = c.get('/courses/edit/Fall 2019/testName/testBuilding/testRoom1/testTime')
        self.assertEqual(response.status_code, 400)

    def test_find_buildings_returns_right_num(self):
        c = Client()
        response = c.get('/courses/buildings')
        self.assertEqual(1, len(response.data["buildings"]))

    def test_find_building_matches_name(self):
        c = Client()
        response = c.get('/courses/buildings')
        self.assertEqual('testBuilding', response.data["buildings"][0])

    def test_find_rooms_returns_right_num(self):
        c = Client()
        response = c.get('/courses/Fall 2019/testBuilding/rooms')
        self.assertEqual(2, len(response.data["rooms"]))

    def test_find_rooms_returns_right_names(self):
        c = Client()
        response = c.get('/courses/Fall 2019/testBuilding/rooms')
        expected = ["testRoom", "testRoom1"]
        self.assertEqual(expected, response.data["rooms"])

    def test_find_courses_returns_rigt_course(self):
        c = Client()
        response = c.get('/courses/Fall 2019/testBuilding/testRoom/classes')
        self.assertEqual("testLamp_serial123", response.data["courses"][0]["fields"]["lamp_serial"])

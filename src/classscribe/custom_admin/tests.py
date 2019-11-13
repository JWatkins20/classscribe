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
            lamp_serial="testLamp_serial"
        )
        Course.objects.create(
            room="testRoom1",
            time="testTime",
            name="test Name",
            building="testBuilding",
            professorID="testProfessorID",
            lamp_serial="testLamp_serial"
        )

    def test_finds_course(self):
        found_course = None
        found_course = Course.objects.get(
            room="testRoom",
            time="testTime",
            name="testName",
            building="testBuilding",
            professorID="testProfessorID",
            lamp_serial="testLamp_serial"
        )
        self.assertNotEqual(found_course, None)

    def test_edit_course_finds_course(self):
        c = Client()
        response = c.get('/courses/edit/testName/testBuilding/testRoom/testTime')
        self.assertEqual(response.status_code, 200)

    def test_edit_course_finds_course_with_space(self):
        c = Client()
        response = c.get('/courses/edit/test Name/testBuilding/testRoom1/testTime')
        self.assertEqual(response.status_code, 200)

    def test_edit_course_fails_to_find_course(self):
        c = Client()
        response = c.get('/courses/edit/testName/testBuilding/testRoom1/testTime')
        self.assertEqual(response.status_code, 400)
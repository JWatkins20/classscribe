from django.test import TestCase, Client
from .models import Course
from notebooks.models import Notebook
from rest_framework import status

class CourseTests(TestCase):

    def setUp(self):
        Course.objects.create(
            room="testRoom",
            time="MWF 8:00-8:50",
            name="testName",
            building="testBuilding",
            professorID="testProfessorID",
            lamp_serial="testLamp_serial123",
            semester="Fall 2019"
        )
        Course.objects.create(
            room="testRoom1",
            time="TThu 8:00-9:15",
            name="test Name",
            building="testBuilding",
            professorID="testProfessorID",
            lamp_serial="testLamp_serial",
            semester="Fall 2019"
        )

    def test_to_string(self):
        course = Course.objects.get(room="testRoom")
        courseString = str(course)
        self.assertEqual("testName MWF 8:00-8:50 testProfessorID", courseString)

    def test_get_semesters(self):
        c = Client()
        response = c.get('/courses/semesters')
        self.assertEqual(response.data["semesters"], ["Fall 2019"])

    def test_submit_course_fails_on_SN(self):
        c = Client()
        response = c.post('/courses/create', data={"room": "testRoom1",
                                                   "time": "MWF 8:00-8:50",
                                                   "courseName": "Unit Course",
                                                   "building": "testBuilding2",
                                                   "professorId": "henryweber@email.virginia.edu",
                                                   "lamp_serial": "testLamp_serial",
                                                   "semester": "Fall 2019"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["message"], "The lamp youre using already is being used in a different building!")

        response = c.post('/courses/create', data={"room": "testRoom2",
                                                   "time": "MWF 8:00-8:50",
                                                   "courseName": "Unit Course",
                                                   "building": "testBuilding",
                                                   "professorId": "henryweber@email.virginia.edu",
                                                   "lamp_serial": "testLamp_serial",
                                                   "semester": "Fall 2019"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["message"], "The lamp youre using already is being used in a different room!")

        Course.objects.create(
            room="testRoom2",
            time="TThu 8:00-9:15",
            name="test Name",
            building="testBuilding",
            professorID="testProfessorID",
            lamp_serial="testLamp_serial",
            semester="Fall 2019"
        )

        response = c.post('/courses/create', data={"room": "testRoom2",
                                                   "time": "MWF 8:00-8:50",
                                                   "courseName": "Unit Course",
                                                   "building": "testBuilding",
                                                   "professorId": "henryweber@email.virginia.edu",
                                                   "lamp_serial": "testLamp_serial",
                                                   "semester": "Fall 2019"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["message"], "Old courses have conflicting SNs!")

    def test_submit_course_succeeds(self):
        c = Client()
        response = c.post('/courses/create', data={"room": "testRoom1",
                                                 "time": "MWF 8:00-8:50",
                                                 "courseName": "Unit Course",
                                                 "building": "testBuilding",
                                                 "professorId": "henryweber@email.virginia.edu",
                                                 "lamp_serial": "testLamp_serial",
                                                 "semester": "Fall 2019"})
        self.assertEqual(response.status_code, 200)

    def test_submit_course_fails_on_conflict(self):
        c = Client()
        response = c.post('/courses/create', data={"room": "testRoom1",
                                                 "time": "MTWF 8:00-8:50",
                                                 "courseName": "Unit Course",
                                                 "building": "testBuilding",
                                                 "professorId": "henryweber@email.virginia.edu",
                                                 "lamp_serial": "testLamp_serial",
                                                 "semester": "Fall 2019"})
        self.assertEqual(response.status_code, 400)

    def test_submit_course_fails_on_bad_time(self):
        c = Client()
        response = c.post('/courses/create', data={"room": "testRoom1",
                                                 "time": "MTWF8:00-8:50",
                                                 "courseName": "Unit Course",
                                                 "building": "testBuilding",
                                                 "professorId": "henryweber@email.virginia.edu",
                                                 "lamp_serial": "testLamp_serial",
                                                 "semester": "Fall 2019"})
        self.assertEqual(response.status_code, 400)

    def test_finds_course(self):
        found_course = None
        found_course = Course.objects.get(
            room="testRoom",
            time="MWF 8:00-8:50",
            name="testName",
            building="testBuilding",
            professorID="testProfessorID",
            lamp_serial="testLamp_serial123",
            semester="Fall 2019"
        )
        self.assertNotEqual(found_course, None)

    def test_edit_course_finds_course(self):
        c = Client()
        response = c.get('/courses/edit/Fall 2019/testName/testBuilding/testRoom/MWF 8:00-8:50')
        self.assertEqual(response.status_code, 200)

    def test_edit_course_finds_course_with_space(self):
        c = Client()
        response = c.get('/courses/edit/Fall 2019/test Name/testBuilding/testRoom1/TThu 8:00-9:15')
        self.assertEqual(response.status_code, 200)

    def test_edit_course_fails_to_find_course(self):
        c = Client()
        response = c.get('/courses/edit/Fall 2019/testName/testBuilding/testRoom1/testTime')
        self.assertEqual(response.status_code, 400)

    def test_find_buildings_returns_right_num(self):
        c = Client()
        response = c.get('/courses/Fall 2019/buildings')
        self.assertEqual(1, len(response.data["buildings"]))

    def test_find_building_matches_name(self):
        c = Client()
        response = c.get('/courses/Fall 2019/buildings')
        self.assertEqual('testBuilding', response.data["buildings"][0])

    def test_find_building_fails_on_empty_semester(self):
        c = Client()
        response = c.get('/courses/ /buildings')
        self.assertEqual(response.status_code, 400)

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

    def test_edit_to_conflicting_time_fails(self):
        c = Client()
        course2 = Course.objects.get(time="TThu 8:00-9:15")
        path = '/courses/edit/' + str(course2.pk)
        response = c.post(path, {
                                'semester': course2.semester,
                                'courseName': course2.name,
                                'building': course2.building,
                                'room': "testRoom",
                                'professorId': course2.professorID,
                                'lamp_serial': course2.lamp_serial,
                                'time': "MTThu 8:00-9:15"
        })

        self.assertEqual(response.data["message"], "Conflicting Times!")

    def test_edit_fails_on_bad_time(self):
        c = Client()
        course2 = Course.objects.get(time="TThu 8:00-9:15")
        path = '/courses/edit/' + str(course2.pk)
        response = c.post(path, {
            'semester': course2.semester,
            'courseName': course2.name,
            'building': course2.building,
            'room': "testRoom",
            'professorId': course2.professorID,
            'lamp_serial': course2.lamp_serial,
            'time': "MTThu8:00-9:15"
        })

        self.assertEqual(response.status_code, 400)

    def test_edit_to_conflicting_lamp_fails(self):
        c = Client()
        course2 = Course.objects.get(time="TThu 8:00-9:15")
        path = '/courses/edit/' + str(course2.pk)

        response = c.post(path, {
            'semester': course2.semester,
            'courseName': course2.name,
            'building': course2.building,
            'room': course2.room,
            'professorId': course2.professorID,
            'lamp_serial': "testLamp_serial123",
            'time': course2.time
        })

        self.assertEqual(response.data["message"], "The lamp youre using already is being used in a different room!")

        response = c.post(path, {
            'semester': course2.semester,
            'courseName': course2.name,
            'building': "testBuilding9",
            'room': course2.room,
            'professorId': course2.professorID,
            'lamp_serial': "testLamp_serial123",
            'time': course2.time
        })

        self.assertEqual(response.data["message"], "The lamp youre using already is being used in a different building!")

    def test_edit_course_makes_successful_change(self):
        c = Client()
        course2 = Course.objects.get(time="TThu 8:00-9:15")
        path = '/courses/edit/' + str(course2.pk)

        response = c.post(path, {
            'semester': course2.semester,
            'courseName': course2.name,
            'building': course2.building,
            'room': "testRoom",
            'professorId': course2.professorID,
            'lamp_serial': "testLamp_serial123",
            'time': course2.time
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_course_makes_successful_change_without_existing_notebook(self):
        c = Client()
        course2 = Course.objects.get(time="TThu 8:00-9:15")
        path = '/courses/edit/' + str(course2.pk)

        response = c.post(path, {
            'semester': course2.semester,
            'courseName': course2.name,
            'building': course2.building,
            'room': "testRoom",
            'professorId': course2.professorID,
            'lamp_serial': "testLamp_serial1234",
            'time': course2.time
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_course_makes_successful_change_with_existing_notebook(self):
        c = Client()
        course2 = Course.objects.get(time="TThu 8:00-9:15")
        existing_notebook = Notebook.objects.create(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes", owner=None)
        existing_notebook.course = course2
        existing_notebook.save()
        path = '/courses/edit/' + str(course2.pk)

        response = c.post(path, {
            'semester': course2.semester,
            'courseName': course2.name,
            'building': course2.building,
            'room': "testRoom",
            'professorId': course2.professorID,
            'lamp_serial': "testLamp_serial1234",
            'time': course2.time
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_course_fails_on_existing_SNs(self):
        Course.objects.create(
            room="testRoom2",
            time="TThuF 8:00-9:15",
            name="test Name",
            building="testBuilding",
            professorID="testProfessorID",
            lamp_serial="testLamp_serial123",
            semester="Fall 2019"
        )

        c = Client()
        course2 = Course.objects.get(time="TThu 8:00-9:15")
        path = '/courses/edit/' + str(course2.pk)

        response = c.post(path, {
            'semester': course2.semester,
            'courseName': course2.name,
            'building': course2.building,
            'room': "testRoom",
            'professorId': course2.professorID,
            'lamp_serial': "testLamp_serial123",
            'time': course2.time
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["message"], "Old courses have conflicting SNs!")

    def test_get_semesters_returns_expected(self):
        c = Client()
        response = c.get('/courses/semesters')
        self.assertEqual(response.data["semesters"], ["Fall 2019"])

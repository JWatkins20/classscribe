from django.test import TestCase, Client
from custom_admin.models import Course
from users.models import User
from notebooks.models import Notebook
from .views import view_professor_notebooks
from rest_framework import status

class CourseTests(TestCase):

    def setUp(self):
        course1 = Course.objects.create(
            room="testRoom",
            time="MWF 8:00-8:50",
            name="testName",
            building="testBuilding",
            professorID="abcde@virginia.edu",
            lamp_serial="testLamp_serial123",
            semester="Fall 2019"
        )
        Course.objects.create(
            room="testRoom1",
            time="TuThu 8:00-9:15",
            name="test Name",
            building="testBuilding",
            professorID="abcde@virginia.edu",
            lamp_serial="testLamp_serial",
            semester="Fall 2019"
        )
        Notebook.objects.create(Private=True,
                                class_name="Test Class",
                                name="Test Class Professor Notebook",
                                owner=None,
                                course=course1)
        User.objects.create(
            university="University of Virginia",
            type="teacher",
            email="abcde@virginia.edu",
            username="Teacher Account"
        )
        User.objects.create(
            university="University of Virginia",
            type="teacher",
            email="fghijk@virginia.edu",
            username="Teacher Account 2"
        )
        student = User.objects.create(
            university="University of Virginia",
            type="student",
            email="12345@virginia.edu",
            username="Student Account"
        )
        Notebook.objects.create(Private=False,
                                class_name="Test Class",
                                name="Test Class 12345@virginia.edu",
                                owner=student,
                                course=course1)

    def test_view_prof_notebooks_success(self):
        teacher = User.objects.get(email="abcde@virginia.edu")
        response = view_professor_notebooks(teacher.pk)
        self.assertEqual(1, len(response.data["data"]))

    def test_view_prof_notebooks_fail_on_no_books(self):
        teacher2 = User.objects.get(email="fghijk@virginia.edu")
        response = view_professor_notebooks(teacher2.pk)
        self.assertEqual(400, response.status_code)

    def test_view_prof_notebooks_fails_for_student(self):
        student = User.objects.get(type="student")
        response = view_professor_notebooks(student.pk)
        self.assertEqual(401, response.status_code)

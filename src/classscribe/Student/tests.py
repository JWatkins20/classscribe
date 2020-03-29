from django.test import TestCase
from .models import Student
from .models import User
from .urls import link_studentID
from django.test.client import Client
from rest_framework import status


class StudentTests(TestCase):

    def test_prof_to_string_returns_expected(self):
            student = Student.objects.create(
            email="12345@virginia.edu",
            idNumber="12345"
        )
            student = Student.objects.get(idNumber="12345",)
            self.assertEqual(str(student), "12345@virginia.edu")
    
    def test_link_student_to_id(self):
        c = Client()
        path = '/IDexists/lamp_registration/rm4mp@virginia.edu/1234'
        response = c.post(path, {})

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_email_and_pk_by_id1(self):
        c = Client()
        
        path = '/api/getUserEmailAndPKByID/1'
        response = c.get(path)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_email_and_pk_by_id(self):
        c = Client()
        User.objects.create(username="12345@virginia.edu", email="bfb3ab", password="124545jfnj", university="University of Virginia", type="Student")
        student = Student.objects.create(
            email="12345@virginia.edu",
            idNumber="12345"
        )
        path = '/api/getUserEmailAndPKByID/12345'
        response = c.get(path)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

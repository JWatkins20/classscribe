from django.test import TestCase
from django.test import TestCase
from .models import User
from .urls import link_studentID
from django.test.client import Client
from rest_framework import status
import random
import string


class APITests(TestCase):

    def test_link_student_to_id(self):
        c = Client()
        User.objects.create(username="rm4mp@virginia.edu", email="rm4mp@virginia.edu", password="124545jfnj", university="University of Virginia", type="Student")
        path = '/api/emailverification/rm4mp@virginia.edu'
        response = c.post(path, {})

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_student_verification(self):
        c = Client()
        user = User.objects.create(username="rm4mp@virginia.edu", email="rm4mp@virginia.edu", password="124545jfnj", university="University of Virginia", type="Student")
        
        verification_password = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(10))
        user.verification_password = verification_password 
        user.save()

        path = '/api/verifyemail/rm4mp@virginia.edu/'+verification_password

        response = c.post(path, {})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
    


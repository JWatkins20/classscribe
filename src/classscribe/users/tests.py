from django.test import TestCase
from users.models import User
from rest_framework import status
from rest_framework.test import APITestCase
BASE_URL = "localhost:8000/api/"
class UserModelTests(TestCase):
	def setUp(self):
		User.objects.create(username="bfb3ab", email="bfb3ab", password="124545jfnj", university="University of Virginia", type="Student")
	def test_find_user(self):
		found_user = None
		found_user = User.objects.get(username="bfb3ab")
		self.assertFalse(found_user is None)

class CreateAccountsEndpointTest(APITestCase):
	def test_create_student(self):
		data = {
			"username": 'testing1@gmail.com',
			"email": 'testing1@gmail.com',
			"password1": 'passw0rd1',
			"password2": 'passw0rd1',
			"first_name": 'Rahat',
			"last_name": 'Maini',
			"university": 'University of Virginia',
			"type": 'student'
		}
		url = "/api/registration/"

		response = self.client.post(url, data, format='json')

		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

	def test_create_teacher(self):
		data = {
			"username": 'testing2@gmail.com',
			"email": 'testing2@gmail.com',
			"password1": 'passw0rd1',
			"password2": 'passw0rd1',
			"first_name": 'Rahat',
			"last_name": 'Maini',
			"university": 'University of Virginia',
			"type": 'teacher'
		}
		url = "/api/registration/"

		response = self.client.post(url, data, format='json')

		self.assertEqual(response.status_code, status.HTTP_201_CREATED)


	def test_create_admin(self):
		data = {
			"username": 'testing1@gmail.com',
			"email": 'testing1@gmail.com',
			"password1": 'passw0rd1',
			"password2": 'passw0rd1',
			"first_name": 'Rahat',
			"last_name": 'Maini',
			"university": 'University of Virginia',
			"type": 'admin',
			"special_password": "7'c$DP$f"
		}
		url = "/api/registration/"

		response = self.client.post(url, data, format='json')

		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class LoginUsers(APITestCase):
	def setUp(self):
		User.objects.create(username="bfb3ab@virginia.edu", email="bfb3ab@virginia.edu", password="124545jfnj", university="University of Virginia", type="student", first_name="Ben", last_name="Brown")
		User.objects.create(username="rm4mp@virginia.edu", email="rm4mp@virginia.edu", password="124545jfnj", university="University of Virginia", type="teacher", first_name="Rahat", last_name="Maini")

	def login_student(self):
		data = {
			"username": 'bfb3ab@virginia.edu',
			"password": '124545jfnj'
		}
		url = "/api/login/"

		response = self.client.post(url, data, format='json')

		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def login_teacher(self):
		data = {
			"username": 'rm4mp@virginia.edu',
			"password": '124545jfnj'
		}
		url = "/api/login/"

		response = self.client.post(url, data, format='json')

		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def login_admin(self):
		data = {
			"username": 'rm4mp@virginia.edu',
			"password": '124545jfnj'
		}
		url = "/api/login/"

		response = self.client.post(url, data, format='json')

		self.assertEqual(response.status_code, status.HTTP_200_OK)





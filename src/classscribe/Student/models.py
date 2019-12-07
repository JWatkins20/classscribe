from django.db import models
from users.models import User

class Student(models.Model):
	idNumber = models.CharField(max_length=60)
	email = models.CharField(max_length=60)

	def __str__(self):
		return self.email


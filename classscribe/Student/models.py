from django.db import models

class Student(models.Model):
	email = models.CharField(max_length=60)
	idNumber = models.CharField(max_length=60)

	def __str__(self):
		return self.name


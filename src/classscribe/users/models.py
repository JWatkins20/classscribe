from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
	university = models.CharField(blank=True, max_length=256) #name of university the user is affiliated with
	type = models.CharField(blank=True, null=True, max_length=2) # type of user (student, teacher, or admin)
	type_object = None
	verification_password = models.CharField(blank=True, max_length=256)
	verified = models.BooleanField(default=False)
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
	university = models.CharField(blank=True, max_length=256)
	type = models.CharField(blank=True, null=True, max_length=2)
	
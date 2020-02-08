from django.db import models


class Professor(models.Model):
    idNumber = models.CharField(max_length=60)
    email = models.CharField(max_length=60)

    def __str__(self):
        return self.email

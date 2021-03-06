from django.db import models


class Course(models.Model):
    room = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    time = models.CharField(max_length=20)
    building = models.CharField(max_length=50)
    professorID = models.CharField(max_length=64)
    lamp_serial = models.CharField(max_length=16)
    semester = models.CharField(max_length=12)

    def __str__(self):
        return self.name + " " + self.time + " " + self.professorID

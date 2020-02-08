from django.db import models
from users.models import User
from imageupload.models import File
from audioupload.models import AudioFile
from custom_admin.models import Course
from datetime import datetime


class Notebook(models.Model):
    Private = models.BooleanField(blank=False)
    class_name = models.CharField(max_length=50)
    name = models.CharField(max_length = 100)
    #pages = models.ManyToManyField(Page, null=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    #rating = models.FloatField(blank=True)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, related_name='notebook')  # helpful for sending pages from student to prof

class Page(models.Model):
    snapshots = models.ManyToManyField(File, null=True, blank=True)
    audio = models.ForeignKey(AudioFile, on_delete=models.CASCADE, null=True, related_name="audio", blank=True)
    name = models.CharField(max_length=50)
    transcript = models.CharField(max_length=200000, blank=True)
    time = models.DateField(default=datetime.now)
    notebook = models.ForeignKey(Notebook, on_delete=models.CASCADE, related_name='pages', null=True)
    submitted = models.BooleanField(default=False)

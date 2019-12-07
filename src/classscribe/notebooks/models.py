from django.db import models
from users.models import User
from imageupload.models import File
from audioupload.models import AudioFile
from datetime import datetime

class Page(models.Model):
    snapshots = models.ManyToManyField(File, null=True, blank=True)
    audio = models.ForeignKey(AudioFile, on_delete=models.CASCADE, null=True, related_name="audio", blank=True)
    name = models.CharField(max_length = 50)
    transcript = models.CharField(max_length=20000, blank=True)
    time = models.DateField(default=datetime.now)


class Notebook(models.Model):
    time = models.DateField(default=datetime.now)
    Private = models.BooleanField(blank=False)
    class_name = models.CharField(max_length=50)
    name = models.CharField(max_length = 100)
    pages = models.ManyToManyField(Page, null=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

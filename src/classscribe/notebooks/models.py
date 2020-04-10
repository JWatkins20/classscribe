from django.db import models
from users.models import User
from imageupload.models import File
from audioupload.models import AudioFile
from custom_admin.models import Course
from datetime import datetime


class Notebook(models.Model):
    Private = models.BooleanField(blank=False) # privacy of the notebook
    class_name = models.CharField(max_length=50) # name of class the notebook is used in
    name = models.CharField(max_length = 100) # name of notebook 
    # user object representing owner of notebook
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True) 
    #collection of users who have favorited a notebook
    FavoritedBy = models.ManyToManyField(User, related_name='favoritedBooks', null=True)
    # helpful for sending pages from student to prof
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, related_name='notebook') 
    sdac_ready = models.BooleanField(default=False)  # used to indicate if notebook is sdac ready

class Page(models.Model):
    snapshots = models.ManyToManyField(File, null=True, blank=True)
    audio = models.ForeignKey(AudioFile, on_delete=models.CASCADE, null=True, related_name="audio", blank=True)
    name = models.CharField(max_length=50)
    transcript = models.CharField(max_length=200000, blank=True)
    handwriting = models.CharField(max_length=200000, blank=True)
    time = models.DateField(default=datetime.now)
    notebook = models.ForeignKey(Notebook, on_delete=models.CASCADE, related_name='pages', null=True)
    submitted = models.BooleanField(default=False)


class NotebookRating(models.Model):
    rating = models.IntegerField(blank=False)
    notebook = models.ForeignKey(Notebook, on_delete=models.PROTECT, related_name='ratings', null=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True, related_name="ratings")

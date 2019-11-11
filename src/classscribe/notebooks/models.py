from django.db import models
from imageupload.models import File

class Notebook(models.Model):
    time = models.DateField(auto_now_add=True)
    Private = models.BooleanField(blank=False)
    class_name = models.CharField(max_length=50)
    name = models.CharField(max_length = 100)
    pages = models.ManyToManyField(File, null=True)
    audio = models.ForeignKey(File, on_delete=models.CASCADE, null=True, related_name="audio")
    transcript = models.CharField(max_length=2000, blank=True)
    #owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

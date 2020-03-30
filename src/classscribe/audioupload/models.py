from django.db import models
from datetime import datetime

class AudioFile(models.Model):
	file = models.FileField(blank=False, null=False)  # actual audio file
	length = models.CharField(max_length=8) # length of audio file
	remark = models.CharField(max_length=20)  # used to store the id of the person so that we can find it later
	class_name = models.CharField(max_length=20) # name of class the audio is from
	timestamp = models.DateTimeField(default=datetime.now) # timestamp when audio was recorded

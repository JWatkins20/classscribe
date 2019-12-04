from django.db import models

class AudioFile(models.Model):
	file = models.FileField(blank=False, null=False)  # actual audio file
	length = models.CharField(max_length=8)
	remark = models.CharField(max_length=20)  # used to store the id of the person so that we can find it later
	class_name = models.CharField(max_length=20)
	timestamp = models.DateTimeField(auto_now_add=True)

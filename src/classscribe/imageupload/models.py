from django.db import models
from datetime import datetime

# Followed tutorial here: https://blog.vivekshukla.xyz/uploading-file-using-api-django-rest-framework/
class File(models.Model):
    file = models.FileField(blank=False, null=False)  # used for the actual file
    remark = models.CharField(max_length=20)  # associated ID number
    class_name = models.CharField(max_length=20)
    page_num = models.CharField(max_length=10)
    #timestamp = models.DateTimeField(default=datetime.now)  # used to sync up with audio
    timestamp = models.CharField(max_length=100)
    lampSN = models.IntegerField()
    newPage = models.BooleanField(default=False)

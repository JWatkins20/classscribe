from django.db import models


# Followed tutorial here: https://blog.vivekshukla.xyz/uploading-file-using-api-django-rest-framework/
class File(models.Model):
    file = models.FileField(blank=False, null=False)  # used for the actual file
    remark = models.CharField(max_length = 20)  # used to store the id of the person so that we can find it later
    timestamp = models.DateTimeField(auto_now_add=True)  # used to sync up with audio

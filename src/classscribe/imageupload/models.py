from django.db import models


# Followed tutorial here: https://blog.vivekshukla.xyz/uploading-file-using-api-django-rest-framework/
class File(models.Model):
    file = models.FileField(blank=False, null=False)
    remark = models.CharField(max_length = 20)
    timestamp = models.DateTimeField(auto_now_add=True)

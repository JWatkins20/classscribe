from django.db import models
from .models import File


class File(models.Model):
    file = models.ImageField(blank=False, null=False)
    def __str__(selfself):
        return self.file.name

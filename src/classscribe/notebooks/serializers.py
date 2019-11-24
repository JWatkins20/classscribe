from rest_framework import serializers
from imageupload.serializers import FileSerializer
from users.serializers import UserDetailsSerializer

from .models import Notebook
from .models import File
from .models import User


class NotebookSerializer(serializers.ModelSerializer):
    pages = FileSerializer(many=True, read_only=True)
    audio = FileSerializer(read_only=True)
    
    class Meta:
        model = Notebook
        fields = ('time', 'Private', 'class_name', 'name', 'pages', 'audio', 'transcript',)
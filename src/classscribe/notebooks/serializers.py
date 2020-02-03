from rest_framework import serializers
from imageupload.serializers import FileSerializer
from audioupload.serializers import AudioFileSerializer
from users.serializers import UserDetailsSerializer

from .models import Notebook, Page
from .models import File
from .models import User

class PageSerializer(serializers.ModelSerializer):
    snapshots = FileSerializer(many=True, read_only=True)
    audio = AudioFileSerializer(read_only=True)
    class Meta:
        model = Page
        fields = ('time', 'snapshots', 'audio', 'name', 'transcript', 'pk', 'submitted')


class NotebookSerializer(serializers.ModelSerializer):
    #pages = PageSerializer(many=True, read_only=True)
    owner = UserDetailsSerializer(read_only=True)
    pages = PageSerializer(read_only = True , many=True)
    class Meta:
        model = Notebook
        depth = 1
        fields = ('Private', 'class_name', 'name', 'pages', 'pk', 'owner')

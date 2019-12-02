from rest_framework import serializers
from imageupload.serializers import FileSerializer
from users.serializers import UserDetailsSerializer

from .models import Notebook, Page
from .models import File
from .models import User

class PageSerializer(serializers.ModelSerializer):
    snapshots = FileSerializer(many=True, read_only=True)
    audio = FileSerializer(read_only=True)

    class Meta:
        model = Page
        fields = ('snapshots', 'audio', 'name', 'transcript')


class NotebookSerializer(serializers.ModelSerializer):
    pages = PageSerializer(many=True, read_only=True)

    class Meta:
        model = Notebook
        fields = ('time', 'Private', 'class_name', 'name', 'pages', 'pk')
from rest_framework import serializers
from imageupload.serializers import FileSerializer
from .models import Pages
from .models import Notebook
from .models import File


class PagesSerializer(serializers.ModelSerializer):
    scans = serializers.PrimaryKeyRelatedField(queryset=File.objects.all(), many=True)

    class Meta:
        model = Pages
        fields = ('scans', 'name')

class NotebookSerializer(serializers.ModelSerializer):
    pages = serializers.PrimaryKeyRelatedField(queryset=Pages.objects.all(), many=True)
    audio = FileSerializer()

    class Meta:
        model = Notebook
        fields = ('time', 'Private', 'class_name', 'name', 'pages', 'audio', 'transcript')
from .models import AudioFile
from rest_framework import serializers

class AudioFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = AudioFile
        fields = ('file', 'remark', 'class_name', 'length', 'timestamp', 'pk')
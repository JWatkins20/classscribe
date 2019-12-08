from rest_framework import serializers
from .models import File


class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = ('file', 'remark', 'class_name', 'page_num', 'timestamp', 'lampSN', 'pk')


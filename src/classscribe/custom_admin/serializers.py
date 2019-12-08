from rest_framework import serializers

from .models import Course

class AssignmentSerializer(serializers.Serializer):
    room = serializers.CharField(max_length=50)
    name = serializers.CharField(max_length=50)
    time = serializers.CharField(max_length=20)
    building = serializers.CharField(max_length=50)
    professorID = serializers.CharField(max_length=7)
    lamp_serial = serializers.CharField(max_length=16)
    semester = serializers.CharField(max_length=12)


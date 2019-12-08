from rest_framework import serializers

from .models import Student

class StudentSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Student
		fields = ('idNumber')

class ArticleSerializer(serializers.Serializer):
	idNumber = serializers.CharField(max_length=120)
	email = serializers.CharField(max_length=60)


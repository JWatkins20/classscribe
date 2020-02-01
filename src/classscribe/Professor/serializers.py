from rest_framework import serializers
from .models import Professor


class ProfessorSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Professor
		fields = ('idNumber')


class ArticleSerializer(serializers.Serializer):
	idNumber = serializers.CharField(max_length=120)
	email = serializers.CharField(max_length=60)


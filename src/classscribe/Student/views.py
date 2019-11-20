from django.shortcuts import render

from rest_framework import viewsets

from .serializers import StudentSerializer
from .models import Student

class StudentViewSet(viewsets.ModelViewSet):
	
	queryset = Student.objects.all().order_by('idNumber')
	serializer_class = StudentSerializer

	

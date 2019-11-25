from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .serializers import StudentSerializer
from .models import Student
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import logging
logger = logging.getLogger("myLogger")

class StudentViewSet(viewsets.ModelViewSet):
	queryset = Student.objects.all().order_by('idNumber')
	serializer_class = StudentSerializer

@api_view(['POST'])
def link_studentID(request, email=None, idNumber=None):
	try:
		student = Student.objects.get(email=email)
		student.idNumber = idNumber
		student.save()
		return Response(status=status.HTTP_200_OK, data={})
	except Exception:
		return Response(status=status.HTTP_400_BAD_REQUEST, data={})

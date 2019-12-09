from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from .serializers import StudentSerializer
from .models import Student
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from users.models import User
from django.core.mail import send_mail
import random
import string

from .serializers import ArticleSerializer

class ArticleView(APIView):
	def get(self, request, idNumber):
		serializer = ArticleSerializer(Student.objects.filter(idNumber=idNumber), many=True)
		return Response({"articles": serializer.data})


@api_view(['POST'])
def link_studentID(request, email=None, idNumber=None):
	try:
		student = Student.objects.create(email=email, idNumber=idNumber)
		student.save()
		send_email(idNumber, email)
		return Response(status=status.HTTP_200_OK, data={})
	except Exception:
		return Response(status=status.HTTP_400_BAD_REQUEST, data={})

@api_view(['GET'])
def getPKbyCardID(request, id=None):
	try:
		student = Student.objects.get(idNumber=id)
		user = User.objects.get(username=student.email)
		return Response(status=status.HTTP_200_OK, data={"pk": user.pk, "email": str(user.email)})
	except Exception:
		return Response(status=status.HTTP_400_BAD_REQUEST, data={})

def send_email(idNumber, email):

	title = 'ID Linked!'
	subject = 'Hello from Team ClassScribe, \n\n' + 'We would like to let you know that the following card ID number has been linked with your account:\n\n' + idNumber + '\n\n' + 'Thank you, happy note-taking!'
	user_email = email
	email = 'class.scribe.co@gmail.com'

	send_mail(title, subject, email, [user_email], fail_silently=False)
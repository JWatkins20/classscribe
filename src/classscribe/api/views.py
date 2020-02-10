from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework import status
from users.models import User
import string
import random
from rest_framework.decorators import api_view

server_url = "https://classscribe-fe.herokuapp.com/"

@api_view(['POST'])
def SendVerificationEmailView(request, email):
	try:
		verification_password = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(10))
		user = User.objects.get(email=email)
		user.verification_password = verification_password
		user.save()

		verification_link = server_url + 'emailverification/' + email + '/' + verification_password
		title = 'Email Verification'
		subject = 'Hello from Team ClassScribe, \n' + 'We would like to verify your email, please click on the link below:\n' + verification_link + '\n' + 'Thank you, happy note-taking!'
		user_email = email
		email = 'class.scribe.co@gmail.com'

		send_mail(title, subject, email, [user_email], fail_silently=False)

		return Response(status=status.HTTP_200_OK, data={})
	except Exception:
		return Response(status=status.HTTP_400_BAD_REQUEST, data={})

@api_view(['POST'])
def verify(request, email, verification_password):
	try:
		user = User.objects.get(email=email)
		if user.verification_password == verification_password:
			user.verified = True
			user.save()
			return Response(status=status.HTTP_200_OK, data={})
		else:
			return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={})
	except Exception:
		return Response(status=status.HTTP_400_BAD_REQUEST, data={})



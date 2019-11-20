from rest_framework.authtoken.models import Token
from rest_framework.generics import RetrieveUpdateAPIView

from users.models import *
from rest_framework.permissions import IsAuthenticated
from users.serializers import AdminRegisterSerializer
from rest_auth.registration.views import RegisterView
from rest_auth.views import UserDetailsView as DefaultUserDetailsView
from .serializers import UserDetailsSerializer

class AdminRegisterView(RegisterView):
	serializer_class = AdminRegisterSerializer

class UserDetailsView(DefaultUserDetailsView):
	serializer_class = UserDetailsSerializer








from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from users.views import *
from .views import *


urlpatterns = [
    path('registration/', include('rest_auth.registration.urls')),
	path('verifyemail/<str:email>/<str:verification_password>', verify, name="verifyemail"),
	path('emailverification/<str:email>', SendVerificationEmailView,name="emailverification"),
	path('adminregistration/', AdminRegisterView.as_view(), name="admin_registration"),
	path('user/',UserDetailsView.as_view(), name="user_details"),
	path('', include('rest_auth.urls'))
]

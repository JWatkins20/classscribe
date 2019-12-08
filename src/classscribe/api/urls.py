from django.urls import path, include
from users.views import *
from .views import *
from Student.views import *


urlpatterns = [
    path('registration/', include('rest_auth.registration.urls')),
	path('getUserEmailAndPKByID/<str:id>', getPKbyCardID, name="getPKbyCardID"),
	path('verifyemail/<str:email>/<str:verification_password>', verify, name="verifyemail"),
	path('emailverification/<str:email>', SendVerificationEmailView,name="emailverification"),
	path('adminregistration/', AdminRegisterView.as_view(), name="admin_registration"),
	path('user/',UserDetailsView.as_view(), name="user_details"),
	path('audioupload/', include('audioupload.urls')),
	path('login/', LoginView.as_view(), name='login'),
	path('', include('rest_auth.urls'))
]

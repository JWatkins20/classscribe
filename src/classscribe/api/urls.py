from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from users.views import AdminRegisterView

urlpatterns = [
    path('registration/', include('rest_auth.registration.urls')),
	path('adminregistration/', AdminRegisterView.as_view(), name="admin_login"),
	path('', include('rest_auth.urls'))
]

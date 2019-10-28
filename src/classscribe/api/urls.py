from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('registration/', include('rest_auth.registration.urls')),
	# path('user/', include('users.urls')),
	path('', include('rest_auth.urls'))
]
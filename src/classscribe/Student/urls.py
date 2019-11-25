from django.urls import include, path, re_path
from django.conf.urls import url
from rest_framework import routers
from .views import *
from django.views.decorators.csrf import csrf_exempt

router = routers.DefaultRouter()
router.register(r'idNumbers', StudentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
	path("lamp_registration/<str:email>/<str:idNumber>", link_studentID, name="link_StudentID"),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

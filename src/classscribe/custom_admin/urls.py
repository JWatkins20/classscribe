from django.urls import path
from .views import *
from .models import Course

urlpatterns = [
    path('create', submit_course, name="submit_course")
]
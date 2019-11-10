from django.urls import path
from .views import *
from .models import Course

urlpatterns = [
    path('create', submit_course, name="submit_course"),
    path('edit/<str:course_name>/<str:building>/<str:room>/<str:time>', edit_course, name="edit")  # used to view/edit the existing course with the provided parameters
]
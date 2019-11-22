from django.urls import path
from .views import *
from .models import Course

urlpatterns = [
    path('create', submit_course, name="submit_course"),
    path('edit/<str:course_name>/<str:building>/<str:room>/<str:time>', edit_course, name="edit"),  # used to view/edit the existing course with the provided parameters
    path('edit/<int:pk>', edit_course, name="edit"),  # used to view/edit the existing course with the provided parameters
    path('buildings', get_buildings, name="get_buildings"),  # returns unique buildings for dropdown selector
    path('<str:building>/rooms', get_rooms, name="get_rooms"),  # returns unique class names for dropdown selector
    path('<str:building>/<str:room>/classes', get_courses, name="get_courses"),  # returns all of the classes for the provided building and room
]

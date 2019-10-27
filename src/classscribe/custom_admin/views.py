from django.shortcuts import render
from django.views.generic import CreateView
from .models import Course


class PersonCreateView(CreateView):
    model = Course
    fields = ('room', 'name', 'time', 'professorID', 'lamp_serial')
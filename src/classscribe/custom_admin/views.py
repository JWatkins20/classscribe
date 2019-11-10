from django.shortcuts import render
from django.views.generic import CreateView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Course



class PersonCreateView(CreateView):
    model = Course
    fields = ('room', 'name', 'time', 'professorID', 'lamp_serial')


@api_view(["POST"])
def submit_course(request):
    print(request.data)
    try:
        Course.objects.create(name=request.data.get("courseName"),
                              professorID=request.data.get("professorId"),
                              building=request.data.get("building"),
                              room=request.data.get("room"),
                              time=request.data.get("time"),
                              lamp_serial=request.data.get("lamp_serial"))
        return Response(status=status.HTTP_200_OK, data={})
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_400_BAD_REQUEST, data={});

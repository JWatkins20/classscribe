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


@api_view(["POST", "GET"])
def edit_course(request, course_name=None, building=None, room=None, time=None):
    print('EDIT COURSE REQUEST METHOD:', request.method)
    cur_entry = Course.objects.filter(name=course_name,
                                      building=building,
                                      room=room,
                                      time=time
                                      )
    if len(cur_entry) != 1:
        print("FOUND", len(cur_entry), "courses for the provided parameters.")

    if request.method == "GET":
        return Response(status=status.HTTP_200_OK, data={
            "course_name": cur_entry[0].name,
            "professorID": cur_entry[0].professorID,
            "building": cur_entry[0].building,
            "room": cur_entry[0].room,
            "time": cur_entry[0].time,
            "lamp_serial": cur_entry[0].lamp_serial
        })

    if request.method == "POST":
        to_edit = cur_entry[0]
        to_edit.name = request.data.get("courseName")
        to_edit.professorID = request.data.get("professorId")
        to_edit.building = request.data.get("building")
        to_edit.room = request.data.get("room")
        to_edit.time = request.data.get("time")
        to_edit.lamp_serial = request.data.get("lamp_serial")
        try:
            to_edit.save()
            return Response(status=status.HTTP_200_OK, data={})
        except Exception as e:
            print(e.message)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={})





import datetime

from django.core import serializers
from django.views.generic import CreateView

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response

import json

from .models import Professor
from custom_admin.models import Course
from users.models import User
from django.db.models import Q

from notebooks.serializers import NotebookSerializer


def view_professor_notebooks(userPK):  # request data should contain logged in username
    try:
        user = User.objects.get(pk=userPK)

    except Professor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND,
                        data={"message": "Couldn't find a matching professor"})

    courses_teaching = Course.objects.filter(professorID=user.email)

    obj = []
    for course in courses_teaching:
        prof_books = course.notebook.filter(Q(owner__pk__exact=user.pk) | Q(owner=None))
        if len(prof_books) != 1:
            return Response(status=status.HTTP_409_CONFLICT,
                            data={"message": "One of the courses being taught is associated with multiple notebooks!"})
        obj.append(prof_books[0])

    objs = []
    for book in obj:
        objs.append(NotebookSerializer(book).data)
    if not objs:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_200_OK, data={"data": objs})


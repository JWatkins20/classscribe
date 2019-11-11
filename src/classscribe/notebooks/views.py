from django.shortcuts import render
from .models import File
from notebooks.serializers import NotebookSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from django.shortcuts import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

# Create your views here.

@api_view(["GET"])
def notebook_page_view(request):
    remark1 = request.query_params.get('remark')# finds pages based on request parameter
    obj = File.objects.filter(remark=remark1)# finds pages with remark matching parameter
    names = []
    for image in obj:
        names.append(image.file.name)
    return Response(status=status.HTTP_200_OK, data={"data": names})

# class ListNotebooks(generics.ListAPIView):
#     serializer_class = NotebookSerializer
    
#     def get(self, request):

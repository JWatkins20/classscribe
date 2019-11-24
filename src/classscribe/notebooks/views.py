from django.shortcuts import render
from .models import File
from .models import User
from notebooks.models import Notebook
from notebooks.serializers import NotebookSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from django.shortcuts import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

# Create your views here.

@api_view(["GET"])
def notebook_page_view(request, pk):
    obj = Notebook.objects.filter(owner__pk__contains=pk)# finds pages with remark matching parameter
    objs = []
    for book in obj:
        objs.append(NotebookSerializer(book).data)
    if len(objs) == 0:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_200_OK, data={"data": objs})


'''
@params: time, Private, class_name, name, pk
time: Date of notebook creation
Private: boolean for if the notebook is private
class_name: name of class
name: name of notebook to be created
pk: pk field of user creating notebook
Creates notebook object and assigns it to user
'''
class NotebookCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = NotebookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            notebook = Notebook.objects.get(name=request.data["name"])
            notebook.owner = User.objects.get(pk=request.data["pk"])
            notebook.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

'''
@params: name, remark
name: name of notebook
remark: remark field of corresponding file
adds file with remark (remark) to notebook with name (name)
'''
@api_view(["POST"])
def add_page_view(request):
    data = request.data
    notebook = Notebook.objects.get(name=data["name"])
    files = File.objects.get(remark=data["remark"])
    notebook.pages.add(files)
    notebook.save()
    if files in notebook.pages.all():
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def add_audio_and_transcript_view(request):
    data = request.data
    notebook = Notebook.objects.get(name=data["name"])
    files = File.objects.get(remark=data["remark"])
    notebook.audio = files
    notebook.transcript = data["transcript"]
    notebook.save()
    if files == notebook.audio:
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
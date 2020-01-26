from django.shortcuts import render
from imageupload.models import File
from .models import User
from .models import AudioFile
from django.db.models import Q
from notebooks.models import Notebook, Page
from notebooks.serializers import NotebookSerializer, PageSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from django.shortcuts import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from datetime import date
from audioupload.views import AudioFile
from django.core.files.uploadedfile import SimpleUploadedFile

# Create your views here.

@api_view(["GET"])
def notebook_page_view(request, pk):
    obj = Notebook.objects.filter(owner__pk__contains=pk)# finds pages with remark matching parameter
    objs = []
    for book in obj:
        objs.append(NotebookSerializer(book).data)
    if not objs:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_200_OK, data={"data": objs})

@api_view(["GET"])
def retrieve_public_notebooks(request, pk):
    obj = Notebook.objects.filter(~Q(owner__pk__contains=pk) & Q(Private=False))# finds pages with remark matching parameter
    objs = []
    for book in obj:
        objs.append(NotebookSerializer(book).data)
    if not objs:
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
Response contains key of created notebook
'''
class NotebookCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = NotebookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            notebook = Notebook.objects.get(name=request.data["name"])
            notebook.owner = User.objects.get(pk=request.data["pk"])
            notebook.save()
            return Response({"key": notebook.pk}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PageCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PageSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                page = Page.objects.get(name=request.data["name"])
                page.notebook = Notebook.objects.get(pk=request.data["pk"])
                page.save()
                return Response({"key": page.pk}, status=status.HTTP_201_CREATED)
            except:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
'''
@params: name, remark
pk: pk of page object
remark: remark field of corresponding file
adds file with remark (remark) to notebook with name (name)
'''
@api_view(["POST"])
def add_file_view(request):
    data = request.data
    files = []
    added_files = []
    page = Page.objects.get(id=data["pk"])
    # today = date.today()
    # files = File.objects.filter(remark=data["remark"], class_name=data["class_name"], timestamp__year=today.year, timestamp__month=today.month, timestamp__day=today.day)
    for pk in data['image_pks']:
        files.append(File.objects.get(pk=pk))
    for f in files:
        page.snapshots.add(f)
        added_files.append(f)
    page.save()
    if len(added_files) > 0:
        return Response({"num_added": len(added_files)}, status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def edit_notebook_view(request):
    data = request.data
    #print(data.keys())
    notebook = Notebook.objects.get(pk=data["pk"])
    notebook.name = data["name"]
    #notebook.private = data["private"]
    try:
        notebook.save()
        return Response(status=status.HTTP_200_OK, data={})
    except Exception as e:
        print(e.message)
        return Response(status=status.HTTP_400_BAD_REQUEST, data={})


@api_view(["POST"])
def toggle_privacy_view(request):
    data = request.data
    notebook = Notebook.objects.get(pk=data["pk"])
    notebook.Private = not notebook.Private
    #notebook.private = data["private"]
    try:
        notebook.save()
        return Response(status=status.HTTP_200_OK, data={'message': 'Should have worked'})
    except Exception as e:
        print(e.message)
        return Response(status=status.HTTP_400_BAD_REQUEST, data={})

@api_view(["POST"])
def add_audio_and_transcript_view(request):
    data = request.data
    page = Page.objects.get(pk=data["pk_page"])
    files = AudioFile.objects.get(pk=data["pk_audio"])
    page.audio = files
    page.transcript = data["transcript"]
    page.save()
    if files == page.audio:
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)



class ProcessingView(APIView):
    def get(self, request):
        notebook1 = Notebook.objects.create(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes")
        file1 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test1", class_name="Practicum", page_num="1")
        file2 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test2", class_name="Something else", page_num="2")
        file3 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test3", class_name="Practicum", page_num="3")
        file4 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test4", class_name="Something else", page_num="4")
        page1 = Page.objects.create(name="Page name") 
        page1.snapshots.add(file1)
        page1.snapshots.add(file2)
        page1.snapshots.add(file3)
        page1.notebook = notebook1
        return Response()

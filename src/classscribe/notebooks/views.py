from django.shortcuts import render
from imageupload.models import File
from .models import User
from .models import AudioFile
from django.db.models import Q
from notebooks.models import Notebook, Page
from notebooks.serializers import NotebookSerializer, PageSerializer, UserBooksandDetailsSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from django.shortcuts import HttpResponse
from rest_auth.views import UserDetailsView as DefaultUserDetailsView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from datetime import date
from audioupload.views import AudioFile
from django.core.files.uploadedfile import SimpleUploadedFile
from django.db.models.base import ObjectDoesNotExist
from Professor.views import view_professor_notebooks
import requests
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.

@api_view(["GET"])
def notebook_page_view(request, pk):
	try:
		user = User.objects.get(pk=pk)
	except User.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

	if user.type == "teacher":
		return view_professor_notebooks(user.pk)
	obj = Notebook.objects.filter(owner__pk__exact=pk)# finds pages with remark matching parameter
	objs = []
	for book in obj:
		pages = Page.objects.filter(notebook=NotebookSerializer(book).data['pk'])
		pages = list(pages)
		for page in range(len(pages)):
			pages[page] = PageSerializer(pages[page]).data
		data = dict(NotebookSerializer(book).data)
		data["pages"] = pages
		objs.append(data)
	if not objs:
		return Response(status=status.HTTP_400_BAD_REQUEST)
	return Response(status=status.HTTP_200_OK, data={"data": objs})

@api_view(["GET"])
def retrieve_public_notebooks(request, pk, class_name):
	user = User.objects.get(pk=pk)
	obj = Notebook.objects.filter(~Q(owner__pk__exact=pk) & ~Q(FavoritedBy=user) & Q(Private=False) & Q(class_name=class_name.replace("%20", " ")))# finds pages with remark matching parameter
	objs = []
	for book in obj:
    		objs.append(NotebookSerializer(book).data)
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
			try:
				notebook = Notebook.objects.get(name=request.data["name"])
				return Response({"key": notebook.pk}, status=status.HTTP_200_OK)
			except ObjectDoesNotExist:
				serializer.save()
				notebook = Notebook.objects.get(name=request.data["name"])
				notebook.owner = User.objects.get(pk=request.data["pk"])
				notebook.save()
				return Response({"key": notebook.pk}, status=status.HTTP_201_CREATED)
		else:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_notebook(request, pk=None):
	notebook = None
	try:
		notebook = Notebook.objects.get(pk=pk)
	except Notebook.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND, data={"message": "Couldn't find the specified notebook to delete!"})

	else:
		notebook.delete()
		return Response(status=status.HTTP_200_OK, data={})


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
	image_pks = str(data["image_pks"])
	image_pks=image_pks.replace("]","")
	image_pks=image_pks.replace("[","")
	image_pks = image_pks.split(',')
	print ("Images passed in:", image_pks)
	print(data["image_pks"])
	for pk in image_pks:
		try:
			files.append(File.objects.get(pk=int(pk)))
		except ObjectDoesNotExist:
			return Response({"type": image_pks}, status=status.HTTP_400_BAD_REQUEST)
	
	print ("Files added:", files)
	
	for f in files:
		page.snapshots.add(f)
		added_files.append(f)


	page.save()
	return Response({"num_added": (data["image_pks"],image_pks)}, status=status.HTTP_201_CREATED)

@api_view(["POST"])
def split_page(request):
	data = request.data

	image_pks = str(data["image_pks"])
	image_pks=image_pks.replace("]","")
	image_pks=image_pks.replace("[","")
	image_pks = image_pks.split(',')

	page = Page.objects.get(pk=data["page_pk"])
	new_page = Page.objects.create(name=page.name, notebook=page.notebook, time=page.time, submitted=False)

	for pk in image_pks:
		page.snapshots.remove(File.objects.get(pk=int(pk)))
		new_page.snapshots.add(File.objects.get(pk=int(pk)))

	return Response(status=status.HTTP_200_OK, data={})

@api_view(["POST"])
def edit_notebook_view(request):
    data = request.data
    notebook = Notebook.objects.get(pk=data["pk"])
    notebook.name = data["name"]
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

@api_view(["POST"])
def favorite_notebook_view(request):
	data = request.data
	#notebooks = Notebook.objects.filter(pk in data["book_pks"])
	user = User.objects.get(pk=data["user_pk"])
	number_added = 0
	note_pks = str(data["books_pk"])
	note_pks=note_pks.replace("]","")
	note_pks=note_pks.replace("[","")
	note_pks = note_pks.split(',')
	try:
		for n in note_pks:
			notebook = Notebook.objects.get(pk=int(n))
			if(user not in notebook.FavoritedBy.all()):
				notebook.FavoritedBy.add(user)
				notebook.save()
				number_added += 1
		if len(note_pks) == number_added:
			return Response(status=status.HTTP_201_CREATED)
		else:
			return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': 'Did not get all notebooks'})
	except ObjectDoesNotExist:
		return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': str(e)})
	except Exception as e:
		return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': str(e)})

@api_view(["POST"])
def unfavorite_notebook_view(request):
	data = request.data
	user = User.objects.get(pk=data["user_pk"])
	notebook = Notebook.objects.get(pk=data["book_pk"])
	try:
		notebook.FavoritedBy.remove(user)
		notebook.save()
		return Response(status=status.HTTP_201_CREATED)
	except Exception as e:
		return Response(status=status.HTTP_400_BAD_REQUEST, data={'msg': str(e)})


# class ProcessingView(APIView):
# 	def get(self, request):
# 		notebook1 = Notebook.objects.create(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes")
# 		file1 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test1", class_name="Practicum", page_num="1")
# 		file2 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test2", class_name="Something else", page_num="2")
# 		file3 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test3", class_name="Practicum", page_num="3")
# 		file4 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test4", class_name="Something else", page_num="4")
# 		page1 = Page.objects.create(name="Page name")
# 		page1.snapshots.add(file1)
# 		page1.snapshots.add(file2)
# 		page1.snapshots.add(file3)
# 		page1.notebook = notebook1
# 		return Response()


@api_view(["GET"])
def send_page_to_prof(request, pk):
	try:
		to_send = Page.objects.get(pk=pk)
		original_owner = to_send.notebook.owner

	except Page.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

	to_send.submitted = True
	to_send.save()
	to_send.pk = None  # make a copy of the page

	prof_notebooks = to_send.notebook.course.notebook.filter(Q(owner=None) | Q(owner__type="teacher"))
	if len(prof_notebooks) != 1:
		return Response(status=status.HTTP_409_CONFLICT)

	prof_notebook = prof_notebooks[0]
	to_send.name = original_owner.email + " submitted"
	to_send.transcript = "Submitted by: " + original_owner.email
	to_send.notebook = prof_notebook
	to_send.save()

	return Response(status=status.HTTP_200_OK)

@api_view(["GET"])
def toggle_sdac_ready(request, pk):  #pk is the pk of the notebook to toggle the sdac_ready attribute
	try:
		notebook = Notebook.objects.get(pk=pk)
		notebook.sdac_ready = not notebook.sdac_ready
		notebook.save()
		return Response(status=status.HTTP_200_OK)

	except Notebook.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

class UserBooksandDetailsView(DefaultUserDetailsView):
	serializer_class = UserBooksandDetailsSerializer


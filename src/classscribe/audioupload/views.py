from rest_framework.response import Response
import os, tempfile, zipfile
from django.http import HttpResponse
import io
from ranged_fileresponse import RangedFileResponse
from django.core.files import File
import requests
from django.core.files.base import ContentFile
from django.http import FileResponse
from wsgiref.util import FileWrapper
from classscribe.settings import MEDIA_ROOT
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from .serializers import AudioFileSerializer
from .models import AudioFile
from rest_framework.views import APIView
from rest_framework.decorators import api_view

class AudioFileUploadView(APIView):
	parser_class = (FileUploadParser,)

	def post(self, request, *args, **kwargs):

		file_serializer = AudioFileSerializer(data=request.data)

		if file_serializer.is_valid():
			file_serializer.save()
			file = AudioFile.objects.get(remark=request.data['remark'])
			return Response({"key": file.pk}, status=status.HTTP_201_CREATED)
		else:
			return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def getAudioFile(request, pk):
	try:
		file = AudioFile.objects.get(pk=pk).file
		res = HttpResponse(file, content_type='audio/mp4')
		res['Content-Disposition'] = 'attachment; filename=%s' % file.name
		return res
	except Exception: # pragma no cover
		return Response({}, status=status.HTTP_400_BAD_REQUEST) #pragma no cover

@api_view(["GET"])
def stream_audio(request, pk):
	audio = AudioFile.objects.get(pk=pk).file
	filepath = str(MEDIA_ROOT +'/'+str(audio)).replace('\\', '/') 
	response = RangedFileResponse(request, open(filepath,"rb"), content_type='audio/mp3')
	response['Content-Disposition'] = 'attachment; filename="%s"' % filepath
	return response

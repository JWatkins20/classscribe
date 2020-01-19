from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from .serializers import AudioFileSerializer
from .models import AudioFile
from django.shortcuts import HttpResponse

class AudioFileUploadView(APIView):
	parser_class = (FileUploadParser,)

	def post(self, request, *args, **kwargs):

		file_serializer = AudioFileSerializer(data=request.data)

		if file_serializer.is_valid():
			file_serializer.save()
			file = AudioFile.objects.get(remark=request.data['remark'], timestamp=request.data['timestamp'])
			return Response({"key": file.pk}, status=status.HTTP_201_CREATED)
		else:
			return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def getAudioFile(request, pk):
	try:
		file = AudioFile.objects.get(pk=pk).file
		res = HttpResponse(file, content_type='audio/mp4')
		res['Content-Disposition'] = 'attachment; filename=%s' % file.name
		return res
	except Exception:
		return Response({}, status=status.HTTP_400_BAD_REQUEST)


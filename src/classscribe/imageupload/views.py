from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.shortcuts import render_to_response

from .serializers import FileSerializer
from .models import File


class FileUploadView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):

        file_serializer = FileSerializer(data=request.data)

        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def scan_view(request):
    obj = File.objects.filter(remark="hank", class_name="test2")
    return render_to_response('image_test.html', {"images": obj})

# Use the following code to POST from python
# import requests
#
# url = "http://localhost:8000/upload/"
#
# data = {
#     'remark': "python test"
# }
#
# files = {
#     'file': open("filename.jpg", "rb")
# }
#
# response = requests.request("POST", url, data=data, files=files)
#
# print(response.text)

# File objects can be searched based on their remark like so:
# image = File.objects.get(remark="python test")

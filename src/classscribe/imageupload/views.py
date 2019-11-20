from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view
from django.conf import settings
import os
import zipfile
from io import BytesIO
from django.shortcuts import HttpResponse

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


@api_view(["GET"])
def scan_view(request):
    obj = File.objects.filter(remark="hank", class_name="test_num")
    names = []
    for image in obj:
        names.append(image.file.name)
    return Response(status=status.HTTP_200_OK, data={"data": names})


@api_view(["GET"])
def download_notebook(request):
    scans = File.objects.filter(remark="hank")
    class_to_page_num = {}  # helps us decide when we've actually reached the last page
    class_to_last_scan = {}  # helps us track the last page scan of each class

    for scan in scans:  # builds a map from the class name to the corresponding last page number
        if scan.class_name in class_to_page_num:
            if int(scan.page_num) > class_to_page_num[scan.class_name]:
                class_to_page_num[scan.class_name] = int(scan.page_num)
                class_to_last_scan[scan.class_name] = scan.file.name
        else:
            class_to_page_num[scan.class_name] = int(scan.page_num)
            class_to_last_scan[scan.class_name] = scan.file.name

    classes = class_to_last_scan.keys()
    files = class_to_last_scan.values()

    zip_subdir = "notebooks"
    zip_filename = "%s.zip" % zip_subdir

    s = BytesIO()

    zf = zipfile.ZipFile(s, "w")

    for name in files:
        fpath = os.path.join(settings.MEDIA_ROOT, name)
        fdir, fname = os.path.split(fpath)
        zip_path = os.path.join(zip_subdir, fname)

        zf.write(fpath, zip_path)

    zf.close()

    resp = HttpResponse(s.getvalue())
    resp['Content-Type'] = 'application/x-zip-compressed'
    resp['Content-Disposition'] = 'attachment; filename=%s' % zip_filename

    return resp

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

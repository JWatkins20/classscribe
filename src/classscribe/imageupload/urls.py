from django.urls import path
from .views import *

urlpatterns = [
    path('', FileUploadView.as_view()),
    path('get/<str:user>/<str:class_name>/<str:date>', scan_view, name="image"),
    path('download/', download_notebook, name="download")
]
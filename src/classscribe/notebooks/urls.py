from django.urls import path
from .views import *

urlpatterns = [
   path('', FileUploadView.as_view()),
   path('get/', scan_view, name="image") 
]
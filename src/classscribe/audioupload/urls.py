from django.urls import path
from .views import *

urlpatterns = [
	path('', AudioFileUploadView.as_view(), name="audiofileupload"),
	path('get/<str:pk>', getAudioFile, name="get_audio_file"),
	path('stream/<slug:pk>', stream_audio, name='stream')
]

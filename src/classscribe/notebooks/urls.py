from django.urls import path
from .views import NotebookCreateView
from .views import *

urlpatterns = [
   path('get/<slug:pk>/', notebook_page_view, name="pages"),
   path('add/', add_page_view),
   path('add/audio/', add_audio_and_transcript_view),
   path('create/', NotebookCreateView.as_view()),
]
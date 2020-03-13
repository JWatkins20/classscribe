from django.urls import path
from .views import NotebookCreateView
from .views import *

urlpatterns = [
	path('get/<slug:pk>/', notebook_page_view, name="notebooks"),
	path('add/', add_file_view, name="add_file"),
	path('add/audio/', add_audio_and_transcript_view, name="audio"),
	path('create/', NotebookCreateView.as_view(), name="create"),
	path('create/page/', PageCreateView.as_view(), name="create_page"),
	path('split/page/', split_page, name="split_page"),
	path('processing/', ProcessingView.as_view()),
	path('delete/<int:pk>', delete_notebook, name="delete_notebook"),
	path('edit/', edit_notebook_view, name="edit_notebook"),
	path('privacy-toggle/', toggle_privacy_view, name="toggle"),
	path('send/page/<int:pk>', send_page_to_prof, name="send_page_to_prof"),
	path('get/public/<slug:pk>/', retrieve_public_notebooks, name="public"),
	path('get/public/<slug:pk>/<str:class_name>/', retrieve_public_notebooks, name="public"),
	path('toggle_sdac/<int:pk>', toggle_sdac_ready, name="toggle_sdac_ready"),
	path('favorite/', favorite_notebook_view, name="favorite"),
	path('unfavorite/', unfavorite_notebook_view, name='unfavorite'),
	path('user/', UserBooksandDetailsView.as_view()),
	path('rate/', NotebookRatingCreateView.as_view(), name='rate'),
	path('export_final_snapshot/<int:page_pk>', export_final_snapshot, name="export_final_snapshot")
]

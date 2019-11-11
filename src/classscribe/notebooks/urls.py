from django.urls import path
from .views import *

urlpatterns = [
   path('get/', notebook_page_view, name="pages"), 
]
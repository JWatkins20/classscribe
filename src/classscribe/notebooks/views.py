from django.shortcuts import render
from notebooks.models import Pages
from notebooks.serializers import PagesSerializer
from rest_framework import generics

# Create your views here.
def create_pages_view(generics.ListCreateApiView):
    queryset = Pages.objects.all()
    serializer_class = PagesSerializer
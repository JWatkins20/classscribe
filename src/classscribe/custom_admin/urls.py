from django.urls import path
from .views import *
from .models import Course

urlpatterns = [
    path('create', PersonCreateView.as_view(model=Course, success_url="/admin"))
]
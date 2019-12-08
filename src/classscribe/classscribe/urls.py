"""classscribe URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include, re_path
from classscribe.views import index

urlpatterns = [
  path('api/', include('api.urls')),
  path('backend/admin/', admin.site.urls),
  path('upload/', include('imageupload.urls')),
  path('courses/', include('custom_admin.urls')),
  path('notebooks/', include('notebooks.urls')),
  path('IDexists/', include('Student.urls'))
  path('audio/', include('audioupload.urls')),
]

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
	urlpatterns.append(re_path(r'^', index, name="index"))
else:
	urlpatterns.append(re_path(r'^', index, name="index"))




from django.shortcuts import render
from rest_framework.authtoken.models import Token

from rest_framework.generics import RetrieveUpdateAPIView
from users.serializers import UserDetailsSerializer


# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
#     def get_object(self):
#         pk = self.kwargs.get('pk')
#
#         if pk == "current":
#             return self.request.user
#
#         return super(UserViewSet, self).get_object()
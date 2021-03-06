from rest_framework import serializers
from imageupload.serializers import FileSerializer
from audioupload.serializers import AudioFileSerializer
from users.serializers import UserDetailsSerializer
from rest_auth.serializers import UserDetailsSerializer as DefaultUserDetailsSerializer
from .models import Notebook, Page, NotebookRating
from .models import File
from .models import User

class PageSerializer(serializers.ModelSerializer):
    snapshots = FileSerializer(many=True, read_only=True)
    audio = AudioFileSerializer(read_only=True)
    class Meta:
        model = Page
        fields = ('time', 'snapshots', 'audio', 'name', 'transcript', 'pk', 'submitted','handwriting')

class NotebookKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = Notebook
        fields = ('name', 'pk')

class RatingsSerializer(serializers.ModelSerializer):
    user = UserDetailsSerializer(read_only=True)
    notebook = NotebookKeySerializer(read_only=True)
    class Meta:
        model = NotebookRating
        fields = ('rating', 'notebook', 'user', 'pk')


class NotebookSerializer(serializers.ModelSerializer):
    #pages = PageSerializer(many=True, read_only=True)
    owner = UserDetailsSerializer(read_only=True)
    pages = PageSerializer(read_only = True , many=True)
    ratings = RatingsSerializer(read_only=True, many=True)
    class Meta:
        model = Notebook
        depth = 1
        fields = ('Private', 'class_name', 'name', 'pages', 'pk', 'owner', 'sdac_ready', 'ratings')


class UserBooksandDetailsSerializer(DefaultUserDetailsSerializer):
    favoritedBooks = NotebookSerializer(read_only=True, many=True)
    ratings = RatingsSerializer(read_only=True, many=True)
    class Meta:
        model = User
        depth = 1
        fields = DefaultUserDetailsSerializer.Meta.fields + (
        'type', 'university', 'verification_password', 'verified', 'type_object', 'favoritedBooks', 'ratings')

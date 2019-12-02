from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as DefaultAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import User

class UserAdmin(DefaultAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ['email', 'first_name', 'last_name', 'university', 'type', 'verified']

admin.site.register(User, UserAdmin)
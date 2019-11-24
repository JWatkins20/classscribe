from rest_framework import serializers
from rest_auth.serializers import UserDetailsSerializer as DefaultUserDetailsSerializer
from django.utils.translation import ugettext_lazy as _
from rest_auth.registration.serializers import RegisterSerializer as DefaultRegisterSerializer
from .models import User
SPECIAL_PASSWORDS = ["7'c$DP$f"]


class RegisterSerializer(DefaultRegisterSerializer):
	first_name = serializers.CharField(max_length=256)
	last_name = serializers.CharField(max_length=256)
	university = serializers.CharField(max_length=256)
	type = serializers.CharField(max_length=256)

	def get_cleaned_data(self):
		data_dict = super().get_cleaned_data()
		data_dict['first_name'] = self.validated_data.get('first_name', '')
		data_dict['last_name'] = self.validated_data.get('last_name', '')
		data_dict['type'] = self.validated_data.get('type', '')
		data_dict['university'] = self.validated_data.get('university', '')
		return data_dict

class AdminRegisterSerializer(RegisterSerializer): #for admin user, not for django admin
	special_password = serializers.CharField(max_length=256)

	def validate(self, data):
		if data['special_password'] not in SPECIAL_PASSWORDS:
			raise serializers.ValidationError(_("Special password is not valid."))
		return data

	def get_cleaned_data(self):
		data_dict = super().get_cleaned_data()
		data_dict['special_password'] = self.validated_data.get('special_password', '')
		return data_dict


class UserDetailsSerializer(DefaultUserDetailsSerializer):
	class Meta:
		model = User
		fields = DefaultUserDetailsSerializer.Meta.fields + ('id', 'pk', 'type', 'university')
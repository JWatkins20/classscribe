from rest_framework import serializers

from users.models import User

from rest_auth.registration.serializers import RegisterSerializer as DefaultRegisterSerializer


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


class UserDetailsSerializer(serializers.ModelSerializer):
	"""
	User model w/o password
	"""
	class Meta:
		model = User
		fields = ('username', 'email', 'first_name', 'last_name', 'type', 'university')
from rest_framework import serializers


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileSerializerfields = "__all__"


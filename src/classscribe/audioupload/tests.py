from django.test import TestCase, Client
from audioupload.models import AudioFile
from django.urls import reverse, reverse_lazy
from django.core.files.uploadedfile import SimpleUploadedFile

class AudioTests(TestCase):
    def setUp(self):
        file1 = AudioFile.objects.create(file=SimpleUploadedFile("test.mp3", b"hello world"), remark="test1", class_name="Practicum", length='23')  
    def testStream(self):
        file1 = AudioFile.objects.get(remark='test1')
        response = self.client.get(reverse('stream', args=[file1.pk,]))
        self.assertTrue(response['Content-Disposition'].find('test') != -1, msg=str(response['Content-Disposition']))
    
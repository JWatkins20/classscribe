from django.test import TestCase
from notebooks.models import Notebook, Page
from users.models import User
from imageupload.models import File
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse, reverse_lazy
from .urls import notebook_page_view
from django.test.client import Client
from rest_framework import status
from rest_framework.test import APITestCase
import json




class NotebookTests(TestCase):
    def setUp(self):
        notebook1 = Notebook.objects.create(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes")
        file1 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test1", class_name="Practicum", page_num="1")
        file2 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test2", class_name="Something else", page_num="2")
        file3 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test3", class_name="Practicum", page_num="3")
        file4 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test4", class_name="Something else", page_num="4")
        page1 = Page.objects.create(name="Page name") 
        page1.snapshots.add(file1)
        page1.snapshots.add(file2)
        page1.snapshots.add(file3)
        notebook1.pages.add(page1)

    def testfindnotebook(self):
        notebook = None
        notebook = Notebook.objects.get(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes") 
        self.assertFalse(notebook is None)
    def testfindnotebookpage(self):
        notebook = None
        file1 = File.objects.get(remark="test1")
        file4 = File.objects.get(remark="test4")
        page1 = Page.objects.get(name="Page name")
        notebook = Notebook.objects.get(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes") 
        self.assertTrue(notebook.pages.filter(pk=page1.pk).exists())
        self.assertTrue(page1.snapshots.filter(pk=file1.pk).exists())
    def testmissingpagepages(self):
        notebook = None
        file4 = File.objects.get(remark="test4")
        page1 = Page.objects.get(name="Page name")
        self.assertFalse(page1.snapshots.filter(pk=file4.pk).exists())
    def testmanytomany(self):
        notebook = Notebook.objects.get(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes")
        pages = []
        pages = File.objects.filter(class_name="Practicum")
        self.assertTrue(len(pages) == 2)
    def testbadfilter(self):
        notebook = Notebook.objects.get(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes")
        pages = []
        pages = File.objects.filter(class_name="Prcticum")
        self.assertTrue(len(pages) == 0)
class NotebookGetViewTests(APITestCase):
    def setUp(self):
        user1 = User.objects.create(username='username134', password='pa$$word12466')
        # user1.save()
        notebook1 = Notebook.objects.create(Private=False, class_name="Class1", name="bfb3ab_notes1")
        notebook2 = Notebook.objects.create(Private=False, class_name="Class2", name="bfb3ab_notes2")
        notebook3 = Notebook.objects.create(Private=False, class_name="Class3", name="bfb3ab_notes3")
        file1 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test1", class_name="Practicum", page_num="1")
        page1 = Page.objects.create(name="Page1 name") 
        page2 = Page.objects.create(name="Page2 name") 
        notebook1.owner = user1
        notebook1.pages.add(page1)
        notebook1.save()
        notebook2.owner = user1  
        notebook2.pages.add(page2)
        notebook2.save()

    def testgetnoparam(self):
        response = self.client.get(reverse('notebooks', args=(2,)), format=json)
        self.assertTrue(response.status_code!=200)

    def testgetuser1(self):
        user = User.objects.get(username='username134')
        response = self.client.get(reverse('notebooks', args=[user.pk]), format=json)
        data = json.loads(response.content)
        self.assertTrue(response.status_code==200)
        self.assertTrue(len(data["data"]) == 2 , msg=str(response.context)) 
    def testaddview(self):
        user = User.objects.get(username='username134')
        response = self.client.get(reverse('notebooks', args=[user.pk]), format=json)
        data = json.loads(response.content)
        self.assertTrue(response.status_code==200)
        self.assertTrue(len(data["data"]) == 2 , msg=str(response.context))
        response = self.client.post(reverse('create'), {"class_name": "added_class", "name": "added_name", "pk": user.pk})
        self.assertTrue(response.status_code==201)
        response = self.client.get(reverse('notebooks', args=[user.pk]), format=json)
        data = json.loads(response.content)
        self.assertTrue(response.status_code==200)
        self.assertTrue(len(data["data"]) == 3 , msg=str(response.context))
    def testaddpages(self):
        user = User.objects.get(username='username134')
        notebook = Notebook.objects.get(name='bfb3ab_notes1')
        response = self.client.get(reverse('notebooks', args=[user.pk]), format=json)
        data = json.loads(response.content)
        self.assertTrue(response.status_code==200)
        self.assertTrue(len(data["data"][0]["pages"]) == 1 , msg=str(response.context))
        response = self.client.post(reverse('create_page'), {"name": "added_page", "pk": notebook.pk})
        self.assertTrue(response.status_code==201)
        response = self.client.get(reverse('notebooks', args=[user.pk]), format=json)
        data = json.loads(response.content)
        self.assertTrue(response.status_code==200)
        self.assertTrue(len(data["data"][0]["pages"]) == 2 , msg=str(response.context))
    def testaddaudio(self):
        user = User.objects.get(username='username134')
        notebook = Notebook.objects.get(name='bfb3ab_notes1')
        page = Page.objects.get(name="Page1 name")
        response = self.client.get(reverse('notebooks', args=[user.pk]), format=json)
        data = json.loads(response.content)
        self.assertTrue(response.status_code==200)
        self.assertTrue(data["data"][0]["pages"][0]["transcript"] == '' , msg=str(response.context))
        response = self.client.post(reverse('audio'), {"remark": "test1", "pk": page.pk, "transcript": "This is the transcript of lecture"})
        self.assertTrue(response.status_code==201)
        response = self.client.get(reverse('notebooks', args=[user.pk]), format=json)
        data = json.loads(response.content)
        self.assertTrue(response.status_code==200)
        self.assertTrue(data["data"][0]["pages"][0]["transcript"] != '' , msg=str(response.context))
        self.assertTrue(data["data"][0]["pages"][0]["audio"]["remark"] == 'test1' , msg=str(response.context))
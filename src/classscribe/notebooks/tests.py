from django.test import TestCase
from notebooks.models import Notebook
from .models import File
from django.core.files.uploadedfile import SimpleUploadedFile

class NotebookTests(TestCase):
    def setUp(self):
        notebook1 = Notebook.objects.create(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes")
        page1 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test1", class_name="Practicum", page_num="1")
        page2 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test2", class_name="Something else", page_num="2")
        page3 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test3", class_name="Practicum", page_num="3")
        page4 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test4", class_name="Something else", page_num="4")
        notebook1.pages.add(page1)
        notebook1.pages.add(page2)
        notebook1.pages.add(page3)
    def testfindnotebook(self):
        notebook = None
        notebook = Notebook.objects.get(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes") 
        self.assertFalse(notebook is None)
    def testfindnotebookpage(self):
        notebook = None
        page1 = File.objects.get(remark="test1")
        page4 = File.objects.get(remark="test4")
        notebook = Notebook.objects.get(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes") 
        self.assertTrue(notebook.pages.filter(pk=page1.pk).exists())
    def testmissingpagepages(self):
        notebook = None
        page4 = File.objects.get(remark="test4")
        notebook = Notebook.objects.get(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes") 
        self.assertFalse(notebook.pages.filter(pk=page4.pk).exists())
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
     
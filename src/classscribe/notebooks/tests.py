from django.test import TestCase
from notebooks.models import Notebook
from notebooks.models import Pages

class NotebookTests(TestCase):
    def setUp(self):
        notebook1 = Notebook.objects.create(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes")
        page1 = Pages.objects.create(name="bfb3ab_11042019_1149")
        page2 = Pages.objects.create(name="bfb3ab_11042019_1151")
        page3 = Pages.objects.create(name="bfb3ab_11042019_1157")
        page4 = Pages.objects.create(name="bfb3ab_11042019_1112")
        notebook1.pages.add(page1)
        notebook1.pages.add(page2)
        notebook1.pages.add(page3)
    def testfindnotebook(self):
        notebook = None
        notebook = Notebook.objects.get(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes") 
        self.assertFalse(notebook is None)
    def testcantfindnotebookpage(self):
        notebook = None
        page1 = Pages.objects.get(name="bfb3ab_11042019_1149")
        page4 = Pages.objects.get(name="bfb3ab_11042019_1112")
        notebook = Notebook.objects.get(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes") 
        self.assertTrue(notebook.pages.filter(pk=page1.pk).exists())
    def testmissingpagepages(self):
        notebook = None
        page4 = Pages.objects.get(name="bfb3ab_11042019_1112")
        notebook = Notebook.objects.get(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes") 
        self.assertFalse(notebook.pages.filter(pk=page4.pk).exists())
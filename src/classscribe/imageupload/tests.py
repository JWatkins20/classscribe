from django.test import TestCase, Client
from .models import File
from notebooks.models import Page
from django.core.files.uploadedfile import SimpleUploadedFile
from classscribe.settings import MEDIA_ROOT


class ImageUploadTests(TestCase):

    def setUp(self):
        self.testFile = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"),
                            remark="testID",
                            class_name="testClass",
                            page_num="0",
                            lampSN=-1)

        self.testPage = Page.objects.create(name="Page name")
        self.testPage.snapshots.add(self.testFile)

    def tearDown(self):
        del self.testFile

    def test_finds_file(self):
        found_file = None
        found_file = File.objects.get(remark="testID",
                                      class_name="testClass",
                                      page_num="0",
                                      lampSN=-1)
        self.assertFalse(found_file is None)

    def test_fails_remark(self):
        found_file = None
        with self.assertRaises(File.DoesNotExist):
            found_file = File.objects.get(remark="badID",
                                          class_name="testClass",
                                          page_num="0",
                                          lampSN=-1)
        self.assertIs(found_file, None)

    def test_fails_class_name(self):
        found_file = None
        with self.assertRaises(File.DoesNotExist):
            found_file = File.objects.get(remark="testID",
                                          class_name="badClass",
                                          page_num="0",
                                          lampSN=-1)
        self.assertIs(found_file, None)

    def test_fails_page_num(self):
        found_file = None
        with self.assertRaises(File.DoesNotExist):
            found_file = File.objects.get(remark="testID",
                                          class_name="testClass",
                                          page_num="1",
                                          lampSN=-1)
        self.assertIs(found_file, None)

    def test_file_upload_view_succeeds(self):
        c = Client()
        filepath = str(MEDIA_ROOT + '/' + str(self.testFile.file.name)).replace('\\', '/')
        data = {
            'file': open(filepath, 'rb'),
            'remark': "testID",
            'class_name': "testClass",
            'page_num': "0",
            'lampSN': 1
        }

        response = c.post("/upload/", data=data)

        self.assertEqual(response.status_code, 201)

    def test_file_upload_view_fails_without_file(self):
        c = Client()
        data = {
            'remark': "testID",
            'class_name': "testClass",
            'page_num': "0",
            'lampSN': 1
        }

        response = c.post("/upload/", data=data)

        self.assertEqual(response.status_code, 400)

    def test_scan_view_returns_correct_names(self):
        c = Client()

        response = c.get('/upload/get/'+self.testPage.name+'/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["data"], [self.testFile.file.name])

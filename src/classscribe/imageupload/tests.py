from django.test import TestCase
from .models import File
from django.core.files.uploadedfile import SimpleUploadedFile


class ImageUploadTests(TestCase):

    def setUp(self):
        File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"),
                            remark="testID",
                            class_name="testClass",
                            page_num="0")

    def test_finds_file(self):
        found_file = None
        found_file = File.objects.get(remark="testID",
                                      class_name="testClass",
                                      page_num="0")
        self.assertFalse(found_file is None)

    def test_fails_remark(self):
        found_file = None
        with self.assertRaises(File.DoesNotExist):
            found_file = File.objects.get(remark="badID",
                                          class_name="testClass",
                                          page_num="0")
        self.assertIs(found_file, None)

    def test_fails_class_name(self):
        found_file = None
        with self.assertRaises(File.DoesNotExist):
            found_file = File.objects.get(remark="testID",
                                          class_name="badClass",
                                          page_num="0")
        self.assertIs(found_file, None)

    def test_fails_page_num(self):
        found_file = None
        with self.assertRaises(File.DoesNotExist):
            found_file = File.objects.get(remark="testID",
                                          class_name="testClass",
                                          page_num="1")
        self.assertIs(found_file, None)

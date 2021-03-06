from django.test import TestCase, Client
from notebooks.models import Notebook, Page
from users.models import User
from imageupload.models import File
from audioupload.models import AudioFile
from custom_admin.models import Course
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse, reverse_lazy
from .urls import notebook_page_view
from django.test.client import Client
from rest_framework import status
from rest_framework.test import APITestCase
from notebooks.serializers import NotebookSerializer
import json




class NotebookTests(TestCase):
    def setUp(self):
        user = User.objects.create(email="testemail@gmail.com")
        notebook1 = Notebook.objects.create(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes", owner=user)
        file1 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test1", class_name="Practicum", page_num="1", lampSN=1)
        file2 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test2", class_name="Something else", page_num="2", lampSN=1)
        file3 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test3", class_name="Practicum", page_num="3", lampSN=1)
        file4 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test4", class_name="Something else", page_num="4", lampSN=1)
        page1 = Page.objects.create(name="Page name") 
        page1.snapshots.add(file1)
        page1.snapshots.add(file2)
        page1.snapshots.add(file3)
        page1.notebook = notebook1
        page1.save()
        page2 = Page.objects.create(name="empty page")
        course = Course.objects.create(room="testRoom", name="testCourse", time="MWF 8:00-8:50", building="testBuilding", professorID="henryweber@email.virginia.edu", lamp_serial="0123456789abcdef", semester="Spring 2020")
        notebook1.course = course
        notebook1.save()
        profNotebook = Notebook.objects.create(Private=False, class_name="testCourse", name="testCourse Professor Notebook", owner=None, course=course)

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

    def testDeleteNotebookSuccess(self):
        notebook = Notebook.objects.get(class_name="Capstone Practicum")
        notebook_pk = notebook.pk
        print(notebook_pk)
        c = Client()
        response = c.delete('/notebooks/delete/' + str(notebook_pk))
        self.assertEqual(response.status_code, 200)

    def testDeleteNotebookFail(self):
        notebook = Notebook.objects.get(class_name="Capstone Practicum")
        notebook_pk = notebook.pk
        c = Client()
        response = c.delete('/notebooks/delete/' + str(notebook_pk+2))
        self.assertEqual(response.data["message"], "Couldn't find the specified notebook to delete!")

    def test_send_to_prof_succeeds(self):
        page_to_send = Page.objects.get(name="Page name")
        c = Client()
        response = c.get('/notebooks/send/page/' + str(page_to_send.pk))
        self.assertEqual(response.status_code, 200)

    def test_send_to_prof_fails_on_bad_page_pk(self):
        page_to_send = Page.objects.get(name="Page name")
        c = Client()
        response = c.get('/notebooks/send/page/' + str(page_to_send.pk+2))
        self.assertEqual(response.status_code, 404)

    def test_send_to_prof_fail_on_no_prof_notebook(self):
        prof_notebook = Notebook.objects.get(class_name="testCourse")
        prof_notebook.course = None
        prof_notebook.save()
        page_to_send = Page.objects.get(name="Page name")
        c = Client()
        response = c.get('/notebooks/send/page/' + str(page_to_send.pk))
        self.assertEqual(response.status_code, 409)

    def test_toggle_sdac_ready_on_to_off(self):
        student_notebook = Notebook.objects.get(class_name="Capstone Practicum")
        c = Client()
        response = c.get('/notebooks/toggle_sdac/' + str(student_notebook.pk))
        self.assertEqual(response.status_code, 200)

    def test_toggle_sdac_ready_fails_on_not_found(self):
        student_notebook = Notebook.objects.get(class_name="Capstone Practicum")
        c = Client()
        response = c.get('/notebooks/toggle_sdac/999')
        self.assertEqual(response.status_code, 404)

    def test_export_snapshot_succeeds(self):
        page = Page.objects.get(name="Page name")
        c = Client()
        response = c.get('/notebooks/export_final_snapshot/' + str(page.pk))
        self.assertEqual(response.get('Content-Disposition'), 'attachment; filename=' + page.name + '.jpeg')

    def test_export_snapshot_fails(self):
        page = Page.objects.get(name="empty page")
        c = Client()
        response = c.get('/notebooks/export_final_snapshot/' + str(page.pk))
        self.assertEqual(response.status_code, 400)

        response = c.get('/notebooks/export_final_snapshot/' + str(page.pk+1))
        self.assertEqual(response.status_code, 404)


class NotebookCreationEndpointTest(APITestCase):
    def setUp(self):
        user1 = User.objects.create(username='a.i@virginia.edu', password='johnny', type='student')
        notebook1 = Notebook.objects.create(Private=False, class_name="Capstone Practicum", name="bfb3ab_11/4/2019_notes", owner=user1)
        Course.objects.create(
            room="Class1",
            time="MWF 8:00-8:50",
            name="Capstone Practicum",
            building="testBuilding",
            professorID="testProfessorID",
            lamp_serial="testLamp_serial123",
            semester="Fall 2019"
        )
    def testendpoint(self):
        response = self.client.post(reverse('create'),{"Private": False, "class_name": 'Capstone Practicum', "name": 'jw2vp CS 1111', "pk": User.objects.get(username='a.i@virginia.edu').pk,})
        self.assertTrue(response.status_code==201, msg=response.data)
        response = self.client.post(reverse('create'),{"Private": False, "class_name": 'Capstone Practicum', "name": 'jw2vp CS 1111', "pk": User.objects.get(username='a.i@virginia.edu').pk,})
        self.assertTrue(response.status_code==200, msg=response.data)
        response2 = self.client.post(reverse('create'),{"Private": False, "class_name": 'Capstone Practicum', "name": 'jw2vp CS 1112', "pk": User.objects.get(username='a.i@virginia.edu').pk,})
        self.assertTrue(response2.status_code==201, msg=response.data)
        self.assertTrue(response.data["key"] == response2.data["key"]-1)
    def testbadserializer(self):
        response = self.client.post(reverse('create'),{})
        self.assertTrue(response.status_code==400, msg=response.data)
    def testNotebookRatingCreate(self):
        user = User.objects.get(username='a.i@virginia.edu')
        notebook = Notebook.objects.get(name="bfb3ab_11/4/2019_notes")
        response = self.client.post(reverse('rate'),{"user_pk": user.pk, "note_pk": notebook.pk, "rating": 1})
        self.assertTrue(response.status_code==201, msg=response.data)
        response = self.client.post(reverse('rate'),{"user_pk": user.pk, "note_pk": notebook.pk, "rating": 0})
        self.assertTrue(response.status_code==200, msg=response.data)
        self.assertTrue(response.data["msg"]=="Rating changed to 0")
class NotebookGetViewTests(APITestCase):
    def setUp(self):
        user1 = User.objects.create(username='username134', password='pa$$word12466')
        user2 = User.objects.create(username='username124', password='pa$$word123')
        user3 = User.objects.create(username='username114', password='pa$$word323')
        
        notebook1 = Notebook.objects.create(Private=False, class_name="Class1", name="bfb3ab_notes1", owner=user1)
        notebook2 = Notebook.objects.create(Private=False, class_name="Class1", name="bfb3ab_notes2", owner=user1)
        notebook3 = Notebook.objects.create(Private=False, class_name="Class1", name="bfb3ab_notes3", owner=user3)
        file1 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test1", class_name="Practicum", page_num="1", lampSN=1)
        file2 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test2", class_name="Practicum", page_num="1", lampSN=1)
        file3 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test3", class_name="Practicum", page_num="1", lampSN=1)
        file4 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test4", class_name="Practicum", page_num="1", lampSN=1)
        audiofile1 = AudioFile.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test1", class_name="Practicum", length="1")
        page1 = Page.objects.create(name="Page1 name") 
        
        Course.objects.create(
            room="Class1",
            time="MWF 8:00-8:50",
            name="Capstone Practicum",
            building="testBuilding",
            professorID="testProfessorID",
            lamp_serial="testLamp_serial123",
            semester="Fall 2019"
        )

        page2 = Page.objects.create(name="Page2 name") 
        notebook1.owner = user1
        page1.notebook = notebook1
        page1.snapshots.add(file1)
        page1.snapshots.add(file2)
        page1.snapshots.add(file3)
        page1.save()
        notebook1.save()
        notebook2.owner = user1  
        page2.notebook = notebook2
        notebook2.save()
        page2.save()

    def testgetnoparam(self):
        response = self.client.get(reverse('notebooks', args=(2,)), format=json)
        self.assertTrue(response.status_code!=200)

    def testgetuser1(self):
        user = User.objects.get(username='username134')
        response = self.client.get(reverse('notebooks', args=[user.pk]), format=json)
        data = json.loads(response.content)
        self.assertTrue(response.status_code==200)
        self.assertTrue(len(data["data"]) == 2 , msg=str(response.context)) 
    def testGetUserFail(self):
        response = self.client.get(reverse('notebooks', args=[12]), format=json)
        self.assertTrue(response.status_code==404)
    def testgetprofessornotebooks(self):
        user2 = User.objects.create(username='username144', password='pa$$word123', type='teacher')
        response = self.client.get(reverse('notebooks', args=[user2.pk]), format=json)
        self.assertTrue(response.status_code==400)
    def testaddview(self):
        user = User.objects.get(username='username134')
        response = self.client.get(reverse('notebooks', args=[user.pk]), format=json)
        data = json.loads(response.content)
        self.assertTrue(response.status_code==200)
        self.assertTrue(len(data["data"]) == 2 , msg=str(response.context))
        response = self.client.post(reverse('create'), {"class_name": "Capstone Practicum", "name": "added_name", "pk": user.pk})
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
    def testBadPageSerializer(self):
        user = User.objects.get(username='username134')
        notebook = Notebook.objects.get(name='bfb3ab_notes1')
        response = self.client.post(reverse('create_page'), {})
        self.assertTrue(response.status_code == 400)
        response = self.client.post(reverse('create_page'), {"name": "added_page", "pk": "32"})
        self.assertTrue(response.status_code == 400)
    def testaddaudio(self):
        user = User.objects.get(username='username134')
        notebook = Notebook.objects.get(name='bfb3ab_notes1')
        page = Page.objects.get(name="Page1 name")
        response = self.client.get(reverse('notebooks', args=[user.pk]), format=json)
        data = json.loads(response.content)
        self.assertTrue(response.status_code==200)
        self.assertTrue(data["data"][0]["pages"][0]["transcript"] == '' , msg=str(response.context))
        a = AudioFile.objects.get(remark="test1")
        response = self.client.post(reverse('audio'), {"pk_page": page.pk, "pk_audio": a.pk,  "transcript": "This is the transcript of lecture"})
        self.assertTrue(response.status_code==201)
        response = self.client.get(reverse('notebooks', args=[user.pk]), format=json)
        data = json.loads(response.content)
        self.assertTrue(response.status_code==200)
        self.assertTrue(data["data"][0]["pages"][0]["transcript"] != '' , msg=str(response.context))
        self.assertTrue(data["data"][0]["pages"][0]["audio"]["remark"] == 'test1' , msg=str(response.context))
    def testaddaudiofails(self):
        response = self.client.post(reverse('audio'), {"pk_page": 999, "pk_audio": 999,  "transcript": "This is the transcript of lecture"})
        self.assertTrue(response.status_code==400)
    def testprivacytoggle(self):
        notebook1 = Notebook.objects.get(name='bfb3ab_notes1')
        notebook1.Private = False      
        response = self.client.post(reverse('toggle'), {"pk": notebook1.pk})
        notebook1 = Notebook.objects.get(name='bfb3ab_notes1')
        self.assertTrue(response.status_code==200)
        self.assertTrue(notebook1.Private, msg=response.data['message'])
    def testprivacytogglefails(self):
        notebook1 = Notebook.objects.get(name='bfb3ab_notes1')
        notebook1.Private = False      
        response = self.client.post(reverse('toggle'), {"pk": 999})
        self.assertTrue(response.status_code==400)
    def testnamechange(self):
        notebook1 = Notebook.objects.get(name='bfb3ab_notes1')
        pk = notebook1.pk    
        response = self.client.post(reverse('edit_notebook'), {"pk": pk, "name": 'new notebook name'})
        notebook1 = Notebook.objects.get(pk=pk)
        self.assertTrue(response.status_code==200)
        self.assertTrue(notebook1.name == 'new notebook name')
        response = self.client.post(reverse('edit_notebook'), {"pk": 98, "name": 'new notebook name'})
        self.assertTrue(response.status_code==400)
    def testfavorite(self):
        notebook1 = Notebook.objects.get(name='bfb3ab_notes1')
        notebook2 =  Notebook.objects.get(name='bfb3ab_notes2')
        notebook3 =  Notebook.objects.get(name='bfb3ab_notes3')
        user = User.objects.get(username='username134')  
        response = self.client.post(reverse('favorite'), {"user_pk": user.pk, "books_pk": [notebook3.pk]})
        self.assertTrue(response.status_code==201)
        notebook3 = Notebook.objects.get(name='bfb3ab_notes3')
        user = User.objects.get(username='username134')
        self.assertTrue(notebook3 in user.favoritedBooks.all())
    def testFavoriteFails(self):
        user = User.objects.get(username='username134')  
        response = self.client.post(reverse('favorite'), {"user_pk": user.pk, "books_pk": [1, 2, 27]})
        self.assertTrue(response.status_code==400, msg=str(response.status_code))

    def testunfavorite(self):
        notebook1 = Notebook.objects.get(name='bfb3ab_notes1')
        notebook2 =  Notebook.objects.get(name='bfb3ab_notes2')
        notebook3 =  Notebook.objects.get(name='bfb3ab_notes3')
        user = User.objects.get(username='username134')  
        response = self.client.post(reverse('favorite'), {"user_pk": user.pk, "books_pk": [notebook1.pk, notebook2.pk, notebook3.pk]})
        self.assertTrue(response.status_code==201)
        notebook3 = Notebook.objects.get(name='bfb3ab_notes3')
        user = User.objects.get(username='username134')
        self.assertTrue(notebook3 in user.favoritedBooks.all())
        response = self.client.post(reverse('unfavorite'), {"user_pk": user.pk, "book_pk": notebook3.pk})
        self.assertTrue(response.status_code==201)
        self.assertTrue(notebook3 not in user.favoritedBooks.all())
        
    def testunfavoritefails(self):
        user = User.objects.get(username='username134')  
        response = self.client.post(reverse('unfavorite'), {"user_pk": user.pk, "book_pk": [999]})
        self.assertTrue(response.status_code==400, msg=str(response.status_code))
    def testRetrievePublicBooks(self):
        user = User.objects.get(username='username134')
        notebook2 = Notebook.objects.get(name='bfb3ab_notes2')
        notebook3 = Notebook.objects.get(name='bfb3ab_notes3')
        notebook = Notebook.objects.get(name='bfb3ab_notes1')
        response = self.client.get(reverse('public', args=[user.pk, notebook.class_name]), format=json)
        self.assertTrue(response.status_code == 200)
        self.assertTrue(notebook3.pk == response.data["data"][0]["pk"], msg={str(response.data["data"])})
    def testAddFile(self):
        file1 = File.objects.get(remark='test1')
        page1 = Page.objects.get(name="Page1 name")
        response = self.client.post(reverse('add_file'), {"pk": page1.pk, "image_pks": [file1.pk]})
        page1 = Page.objects.get(name="Page1 name")
        self.assertTrue(response.status_code==201)
        self.assertTrue(file1 in page1.snapshots.all(), msg=str(page1.snapshots.all()))
    def testBadAddFile(self):
        file1 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test1", class_name="Practicum", page_num="1", lampSN=1)
        file2 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test2", class_name="Something else", page_num="2", lampSN=1)
        file3 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test3", class_name="Practicum", page_num="3", lampSN=1)
        file4 = File.objects.create(file=SimpleUploadedFile("test.jpg", b"hello world"), remark="test4", class_name="Something else", page_num="4", lampSN=1)
        page1 = Page.objects.create(name="Page1 name") 
        response = self.client.post(reverse('add_file'), {"pk": page1.pk, "image_pks": [99]})
        self.assertTrue(response.status_code==400)
    def testSplitPage(self):
        page1 = Page.objects.get(name='Page1 name')
        images = [1,2,3]
        self.client.post(reverse('split_page'), {"image_pks": images, "page_pk": page1.pk})


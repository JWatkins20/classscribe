from django.test import TestCase
from users.models import User
class UserModelTests(TestCase):
    def setUp(self):
        User.objects.create(username="bfb3ab", email="bfb3ab", password="124545jfnj", university="University of Virginia", type="Student")
    def test_find_user(self):
        found_user = None
        found_user = User.objects.get(username="bfb3ab")
        self.assertFalse(found_user is None)

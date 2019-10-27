import unittest
import main

class TestStringMethods(unittest.TestCase):
    
    # Tapping Ben's ID should return this
    def test_Ben_ID(self):
        self.assertEqual("['2', '1', '5', '3', '4', '4', '3', '2', '1', '8', 'X']",main.waitingForID())

if __name__ == '__main__':
    unittest.main()
    

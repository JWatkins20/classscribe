import unittest
import main
import returnIDnumbers as retIDs
import os
import picamera
import encryption

class TestStringMethods(unittest.TestCase):

    def test_successful_ID_retrieval(self):
	self.assertTrue(retIDs.findIfIDnumberPresent("2152683378"))

    def test_successful_ID_rejection(self):
	self.assertFalse(retIDs.findIfIDnumberPresent("2153443218")) #Ben's ID is not in the database

    def test_Rahat_ID(self):
        self.assertEqual("2152683378",main.waitingForID())

    def test_audio_recorded(self):
	os.system("arecord --device=hw:1,0 --format S16_LE --rate 44100 -c1 test.wav")
	self.assertTrue(os.path.exists("test.wav"))
    
    def test_image_capture(self):
	camera=picamera.PiCamera()
	camera.capture("test.jpg")
	self.assertTrue(os.path.exists("test.jpg"))
	
    def test_encryption(self):
	self.assertEqual("gAAAAABdoDAuPG4UahMsI2--NxNAXkR5OEULtEXEYspjE_8b1zmShQelrbhNUmjf563IOmEXCp1UMEO5JHMsQD_NE4x23ygOJA==",encryption.encryptID("2152683378"))

if __name__ == '__main__':
    unittest.main()

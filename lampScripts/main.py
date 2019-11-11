import inkyphat
from PIL import Image, ImageFont, ImageDraw
import subprocess
import requests
import picamera
import datetime

#import keybdStream as kbd
import encryption
import qr
import returnIDnumbers

inkyphat.set_colour("black")
font = ImageFont.truetype(inkyphat.fonts.AmaticSCBold, 38)

#camera=picamera.PiCamera()


def sendImage(idNumber, timeOfCapture, className, filename): #POST request to send images to server
	url = "http://128.143.67.97:44104/upload/"

	data = {
		'encryptedID': idNumber,
		'timeOfCapture': timeOfCapture,
		'className': className
	}

	files = {
     		'file': open(filename, "rb")
	}

	response = requests.request("POST", url, data=data, files=files)

	print(response.text)


def waitingForID(): #loop till ID is presented
	flag = 1
	while (flag):
		idNumber=raw_input()
		flag = 0
	#ID received, time to encrypt
	#return (encryption.encryptID(idNumber))		
	return idNumber

def printOutIP(): #for debugging, prints out wlan0 IP of Pi to screen
	out = subprocess.Popen(['hostname', '-I'],
           stdout=subprocess.PIPE,
           stderr=subprocess.STDOUT)


	img = Image.new("P", (inkyphat.WIDTH, inkyphat.HEIGHT))
	draw = ImageDraw.Draw(img)

	message = str(out.communicate()[0])

	w, h = font.getsize(message)
	x = (inkyphat.WIDTH / 2) - (w / 2)
	y = (inkyphat.HEIGHT / 2) - (h / 2)

	draw.text((x, y), message, inkyphat.BLACK, font)
	inkyphat.set_image(img)
	inkyphat.show()

def captureAndUploadLoop():
	i=0
	while (i<5):
		i+=1
		filename='image'+str(datetime.datetime.now())+'.jpg'
		camera.capture(filename)
		sendImage("sample id number", str(datetime.datetime.now()),"APMA 3080", filename)


if __name__ == '__main__':
	inkyphat.set_colour("black")
	font = ImageFont.truetype(inkyphat.fonts.AmaticSCBold, 38)
	printOutIP()

	while (1):
        	encryptedIDnumber=waitingForID() #read encrypted version of the ID number


        	if (returnIDnumbers.findIfIDnumberPresent(encryptedIDnumber)):
                	img = Image.new("P", (inkyphat.WIDTH, inkyphat.HEIGHT))
                	draw = ImageDraw.Draw(img)

                	message = "Welcome"

                	w, h = font.getsize(message)
                	x = (inkyphat.WIDTH / 2) - (w / 2)
                	y = (inkyphat.HEIGHT / 2) - (h / 2)

                	draw.text((x, y), message, inkyphat.BLACK, font)
                	inkyphat.set_image(img)
                	inkyphat.show()
        		#pass #start scanning

        	else: #not in database, generate QR code to assign encrypted ID to a user
                	qr.printQRcode(encryptedIDnumber)       
        		#captureAndUploadLoop() 

import inkyphat
from PIL import Image, ImageFont, ImageDraw
import subprocess
import requests

import keybdStream as kbd
import encryption
import qr

inkyphat.set_colour("black")
font = ImageFont.truetype(inkyphat.fonts.AmaticSCBold, 38)

def sendImage(idNumber, timeOfCapture, className): #POST request to send images to server
        url = "http://128.143.67.97:44104/upload/"

        data = {
                'encryptedID': idNumber,
                'timeOfCapture': timeOfCapture,
                'className': className
        }

        files = {
                'file': open("filename.jpg", "rb")
        }

        response = requests.request("POST", url, data=data, files=files)

        print(response.text)


def waitingForID(): #loop till ID is presented
        flag = 1
        while (flag):
                idNumber=str(kbd.waitingForID())
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

#printOutIP()
encryptedIDnumber=waitingForID() #read encrypted version of the ID number
print (encryptedIDnumber)
isInDatabase=0 #blackboxed checking database to see if encrypted ID is in user database

if (isInDatabase):
        pass #start scanning
else: #not in database, generate QR code to assign encrypted ID to a user
        qr.printQRcode(encryptedIDnumber)

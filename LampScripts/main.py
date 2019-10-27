import inkyphat
from PIL import Image, ImageFont, ImageDraw
import subprocess

import keybdStream as kbd


inkyphat.set_colour("black")
font = ImageFont.truetype(inkyphat.fonts.AmaticSCBold, 3$

def waitingForID(): #loop till ID is presented
        flag = 1
        while (flag):
                idNumber=kbd.waitingForID()
                flag = 0
        #ID received, time to encrypt


def printOutIP(): #for debugging, prints out wlan0 IP of$
        out = subprocess.Popen(['hostname', '-I'],
           stdout=subprocess.PIPE,
           stderr=subprocess.STDOUT)


        img = Image.new("P", (inkyphat.WIDTH, inkyphat.H$
        draw = ImageDraw.Draw(img)

        message = str(out.communicate()[0])

        w, h = font.getsize(message)
        x = (inkyphat.WIDTH / 2) - (w / 2)
        y = (inkyphat.HEIGHT / 2) - (h / 2)

        draw.text((x, y), message, inkyphat.BLACK, font)
        inkyphat.set_image(img)
        inkyphat.show()

printOutIP()
waitingForID()
                              

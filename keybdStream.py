import string

from evdev import InputDevice
from select import select
idNum=[]
keys = "X^1234567890XXXXqwertzuiopXXXXasdfghjklXXXXXyxcvbnmXXXXXXXXXXXXXXXXXXXXXXX"
dev = InputDevice('/dev/input/by-id/usb-HXGCoLtd_27db-event-kbd')

def waitingForID():
	while True:
   		r,w,x = select([dev], [], [])
   		for event in dev.read():
        		if event.type==1 and event.value==1:
                		idNum.append( keys[ event.code ] )
   			if ('X' in idNum):
				return (idNum)

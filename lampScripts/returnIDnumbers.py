import json
import urllib2


def findIfIDnumberPresent(idNumber):

    url = "http://128.143.67.97:44104/getStudentIDs/IDs/?format=json"

    response = urllib2.urlopen(url)

    data = json.loads(response.read())

    listOfUsers=[]

    for i in data:
        listOfUsers.append(i["idNumber"])

    return (idNumber in listOfUsers)




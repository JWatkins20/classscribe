# Class-Scribe

Travis CI status: [![Build Status](https://travis-ci.com/uva-cp-1920/Class-Scribe.svg?branch=master)](https://travis-ci.com/uva-cp-1920/Class-Scribe)

Currently there are 3 major ways of note taking in lecture halls: classic pencil and paper, laptop, or tablet with a stylus. Countless studies have assessed the ineffectiveness of typed notes for retention of material, and even more have laid out the distractibility of tablets (such as iPads) where notifications fight for your attention. Pencil and paper is an optimal writing experience that lacks the modern touch that makes digital note taking so lucrative (cloud syncing, search, no weight of books). Class Scribe is a project that aims to bring the best of modern digital note taking to traditional paper and pencil, with minimal management. Class Scribe consists of 2 products:
• A physical lamp, containing a Raspberry Pi, camera, and microphone
• A web app for students and admins to access

The lamps are designed to be sold in bulk to universities for placement in lecture halls for use by students. These lamps automatically and continuously scan students’ desk for documents, and upload it to each student’s account for later, along with accompanying lecture audio recorded via the microphone onboard, transcribed to text to be readable later while studying for the user.

Students notes will be sorted chronologically and automatically within notebooks for the class they are in (set up by admins in the web app, each lamp knows which class it is in and what class is taking place when you are using it). Students will also have the option to set their notebooks to be for private viewing or public viewing, so others can view notebooks from other students when studying for the specific class.

The web app will also sync up the audio from the lecture with their handwritten notes (scanned at 10 second intervals), so the student can listen to what the instructor was saying exactly when they were writing down the note that they wrote last. Students can export their notes as PDFs, all data is deleted at the end of the semester and no personally identifiable information other than email addresses are stored.

We are looking for team members with experience in making a web front end (preferably the React framework) and back end (for storage of the document scans and audio in the database, and user account control). Experience with Python and the Raspberry Pi is also welcomed (as this will power the lamp). A sample requirements list is available here.


### Contact Information

Rahat Maini -- student in the same CS 4970/1 course sequence

rm4mp@virginia.edu

Note: Prof. Ibrahim will be act as the customer for this project (add requirements / approving features) as needed.

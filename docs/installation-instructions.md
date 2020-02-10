
prerequisite steps:
1. download git, heroku cli, node, for terminal
	heroku cli: https://devcenter.heroku.com/articles/heroku-cli#download-and-install
	git: https://git-scm.com/downloads
	node: https://nodejs.org/en/download/
2. create heroku account

0. open terminal/command line on your operating system 
1. git clone repo
2. use terminal to enter repo folder

for backend:
1. create a new heroku app
2. go to the settings
3. select the python buildpack under the buildpacks section
enter these following commands into the terminal, which should be in the root folder of the git repo
that was just cloned
1. git subtree split --prefix src/classscribe master
-this command generates an alphanumeric string of characters
2. git push heroku <string of characters>:master
3. heroku run python manage.py migrate --run-syncdb
the backend should be up and running now



to load some test values into
1. heroku run python manage.py createsuperuser 

for frontend:
1. create a new heroku app
2. go to the settings
3. select the nodejs buildpack under the buildpacks section
enter these following commands into the terminal, which should be in the root folder of the git repo
that was just cloned

1. create a new heroku app
2. switch the git heroku repo to the new git heroku repo of the frontend
	-to do this, go the app's settings on the web browser and enter the following commands.
3. git remote rm heroku
4. git remote add heroku <git address from settings page>
5. git subtree split --prefix src/classscribe-fe master
-this command generates an alphanumeric string of characters
6. git push heroku <string of characters>:refs
/heads/master 




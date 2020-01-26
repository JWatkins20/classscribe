release: python src/classscribe/manage.py makemigrations
release: python src/classscribe/manage.py migrate --runsync-db
release: npm run --prefix src/classscribe-fe build
web: python src/classscribe/manage.py runserver 0.0.0.0:$PORT
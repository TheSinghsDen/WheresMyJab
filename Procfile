release: python manage.py migrate
web: gunicorn wheresmyjab.wsgi --log-file -
worker: ./bin/docker-worker-celery --with-scheduler # optional

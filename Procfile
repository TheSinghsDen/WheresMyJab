release: python3 manage.py collectstatic --noinput manage.py migrate
web: gunicorn wheresmyjab.wsgi --log-file -

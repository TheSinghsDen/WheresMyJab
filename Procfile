release: python3 manage.py migrate
web: gunicorn wheresmyjab.wsgi --bind 0.0.0.0:$PORT --log-file -

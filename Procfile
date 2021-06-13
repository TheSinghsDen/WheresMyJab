release: python manage.py migrate
web: gunicorn wheresmyjab.wsgi:application --log-file - --log-level debug
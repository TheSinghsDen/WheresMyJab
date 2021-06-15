release: python3 manage.py migrate 
web: gunicorn wheresmyjab.wsgi --log-file -
worker: python3 manage.py runscript poll_cowin --traceback
"""
Django settings for WheresMyJab project.

Generated by 'django-admin startproject' using Django 3.2.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

import os
import sys
from pathlib import Path
from typing import Any, Callable, List, Optional

import dj_database_url
from django.core.exceptions import ImproperlyConfigured
from wheresmyjab.utils import str_to_bool, print_warning


def get_from_env(key: str, default: Any = None, *, optional: bool = False, type_cast: Optional[Callable] = None) -> Any:
    value = os.getenv(key)
    if value is None:
        if optional:
            return None
        if default is not None:
            return default
        else:
            raise ImproperlyConfigured(
                f'The environment variable "{key}" is required to run WheresMyJab!')
    if type_cast is not None:
        return type_cast(value)
    return value


def get_list(text: str) -> List[str]:
    if not text:
        return []
    return [item.strip() for item in text.split(",")]


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = get_from_env("DEBUG", False, type_cast=str_to_bool)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

DEFAULT_SECRET_KEY = "<randomly generated secret key>"

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY", DEFAULT_SECRET_KEY)


ALLOWED_HOSTS = get_list(os.getenv("ALLOWED_HOSTS", "*"))


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'wheresmyjab.apps.WheresMyJabConfig',
    'rest_framework',
    'corsheaders',
]

# Use django-extensions if it exists
try:
    import django_extensions  # noqa: F401
except ImportError:
    pass
else:
    INSTALLED_APPS.append("django_extensions")

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ORIGIN_ALLOW_ALL = True

ROOT_URLCONF = 'wheresmyjab.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'wheresmyjab.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

if DEBUG:
    DATABASE_URL = os.getenv(
        "DATABASE_URL", "postgres://localhost:5432/wheresmyjab")
else:
    DATABASE_URL = os.getenv("DATABASE_URL", "")

if DATABASE_URL:
    DATABASES = {"default": dj_database_url.config(
        default=DATABASE_URL, conn_max_age=600)}
    if DEBUG:
        del DATABASES['default']['PASSWORD'], DATABASES['default']['HOST'], DATABASES['default']['PORT']
else:
    raise ImproperlyConfigured(
        f'The environment vars "DATABASE_URL" is absolutely required to run this software'
    )

# Broker
# if DEBUG or (len(sys.argv) > 1 and sys.argv[1] == "collectstatic"):
#     REDIS_URL = os.getenv("REDIS_URL", "redis://localhost/")
# else:
#     REDIS_URL = os.getenv("REDIS_URL", "")

# if not REDIS_URL:
#     raise ImproperlyConfigured(
#         "Env var REDIS_URL is absolutely required to run this software.")

# CELERY_BROKER_URL = REDIS_URL  # celery connects to redis
# CELERY_RESULT_BACKEND = REDIS_URL  # stores results for lookup when processing
# # only applies to delay(), must do @shared_task(ignore_result=True) for apply_async
# CELERY_IGNORE_RESULT = True


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

if DEBUG:
    print_warning(
        (
            "️Environment variable DEBUG is set - WheresMyJab is running in DEVELOPMENT MODE!",
            "Be sure to unset DEBUG if this is supposed to be a PRODUCTION ENVIRONMENT!",
        )
    )

if not DEBUG and SECRET_KEY == DEFAULT_SECRET_KEY:
    print_warning(
        (
            "You are using the default SECRET_KEY in a production environment!",
            "For the safety of your instance, you must generate and set a unique key."
        )
    )
    sys.exit("[ERROR] Default SECRET_KEY in production. Stopping Django server…\n")

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# FCM SETTINGS
FCM_SERVER_KEY = os.getenv("FCM_SERVER_KEY", None)
FCM_SERVER = os.getenv("FCM_SERVER", "https://fcm.googleapis.com/fcm/send")

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler", }, },
    "root": {"handlers": ["console"], "level": os.getenv("DJANGO_LOG_LEVEL", "INFO")},
    "loggers": {
        "django": {"handlers": ["console"], "level": os.getenv("DJANGO_LOG_LEVEL", "INFP"), "propagate": True, },
    },
}

from django.urls import path, include
from wheresmyjab.api import router

urlpatterns = [
    path("api/", include(router.urls)),
]

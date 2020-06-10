from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', include('accounts.urls')),
    path('', include('frontend.urls')),
    path('', include('catalogos.urls')),     
    path('', include('carSales.urls'))
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from django.contrib import admin
from django.urls import path

from django.conf.urls import url

from .views import padding, sampling, seqResolve


urlpatterns = [
    path('admin/', admin.site.urls),

    url(r'padding', padding, name='padding'),
    url(r'sampling', sampling, name='sampling'),
    url(r'seqResolve', seqResolve, name='seqResolve'),

]

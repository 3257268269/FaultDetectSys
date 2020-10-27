from django.contrib import admin
from django.urls import path

from django.conf.urls import url

from .views import padding, sampling, seqResolve, classify, detect


urlpatterns = [
    path('admin/', admin.site.urls),

    url(r'padding', padding, name='padding'),
    url(r'sampling', sampling, name='sampling'),
    url(r'seqResolve', seqResolve, name='seqResolve'),
    url(r'classify', classify, name='classify'),
    url(r'detect', detect, name='detect'),


]

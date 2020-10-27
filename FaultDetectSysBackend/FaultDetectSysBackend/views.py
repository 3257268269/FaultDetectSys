# coding=utf-8
import sys
sys.path.append('..') 

from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout, login, authenticate
from django.http import HttpResponse, HttpResponseRedirect

from .core.padding import paddingCore
from .core.sampling import largest_triangle_three_buckets
from .core.seqResolve import seqResolveCore
from .core.classify import classifyCore
from .core.detect import detectCore

import json,datetime,sched,threading,time
import functools
print = functools.partial(print, flush=True)


#缺失值填充
@require_http_methods(["POST"])
def padding(request):
    if request.method == 'POST':
        data = json.loads(request.body)['data']

        result = paddingCore(data)
        return HttpResponse(json.dumps({
            "code": 1,
            "data": json.dumps(result)
        }))

#降采样
@require_http_methods(["POST"])
def sampling(request):
    if request.method == 'POST':
        data = json.loads(request.body)['data']
        result = largest_triangle_three_buckets(data, 500)

        return HttpResponse(json.dumps({
            "code": 1,
            "data": json.dumps(result)
        }))

#序列分解
@require_http_methods(["POST"])
def seqResolve(request):
    if request.method == 'POST':
        data = json.loads(request.body)['data']

        seasonal, resid, trend = seqResolveCore(data)
        result = {
            "seasonal" : seasonal,
            "resid" : resid,
            "trend" : trend,
        }

        return HttpResponse(json.dumps({
            "code": 1,
            "data": json.dumps(result)
        }))


#分类
@require_http_methods(["POST"])
def classify(request):
    if request.method == 'POST':
        data = json.loads(request.body)['data']
        result = classifyCore(data)

        return HttpResponse(json.dumps({
            "code": 1,
            "data": json.dumps(result)
        }))

#故障检测
@require_http_methods(["POST"])
def detect(request):
    if request.method == 'POST':
        data = json.loads(request.body)['data']
        result = detectCore(data)

        return HttpResponse(json.dumps({
            "code": 1,
            "data": json.dumps(result)
        }))
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

import json,datetime,sched,threading,time
import functools
print = functools.partial(print, flush=True)


#缺失值填充
@require_http_methods(["GET"])
def padding(request):
    if request.method == 'GET':
        data = [
            [0,119.5227859],
            [1,119.8929321],
        ]

        result = paddingCore(data, 10)
        print(result)

        return HttpResponse(json.dumps({
            "code": 1,
            "data": json.dumps(result)
        }))


#降采样
@require_http_methods(["GET"])
def sampling(request):
    if request.method == 'GET':
        data = [
            [0,119.5227859],
            [1,119.8929321],
            [2,121.5423807],
            [3,166.8080791],
            [4,166.5059194],
            [5,166.4370359],
            [6,169.7631897],
            [7,166.1769758],
            [8,166.4295219],
            [9,168.3574892],
            [10,167.434889],
            [11,164.1071697],
            [12,166.417753],
            [13,169.0103907],
            [14,169.1120697],
            [15,169.4704666],
            [16,169.7574343],
            [17,168.7331259],
            [18,168.0091305],
            [19,168.5546647],
            [20,166.475726],
            [21,165.7804158],
            [22,166.3985895],
            [23,164.754577],
            [24,163.2987564],
            [25,162.4213805],
            [26,163.2864626],
        ]
        result = largest_triangle_three_buckets(data, 10)
        print(result)

        return HttpResponse(json.dumps({
            "code": 1,
            "data": json.dumps(result)
        }))

@require_http_methods(["GET"])
def seqResolve(request):
    if request.method == 'GET':
        data = [
            [0,119.5227859],
            [1,119.8929321],
            [2,121.5423807],
            [3,166.8080791],
            [4,166.5059194],
            [5,166.4370359],
            [6,169.7631897],
            [7,166.1769758],
            [8,166.4295219],
            [9,168.3574892],
            [10,167.434889],
            [11,164.1071697],
            [12,166.417753],
            [13,169.0103907],
            [14,169.1120697],
            [15,169.4704666],
        ]
        data = [
           119.5227859,
           119.8929321,
           121.5423807,
        
        ]
        result = seqResolveCore(data)
        print(result)

        return HttpResponse(json.dumps({
            "code": 1,
            "data": json.dumps(result)
        }))
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.core import serializers
from django.forms.models import  model_to_dict
from . import models
import urllib.request
import json
# Create your views here.
def poll(request):
    if request.method == "POST":
        course = json.loads(request.POST.get("course", None))
        userInfo = json.loads(request.POST.get("userInfo", None))
        userID = json.loads(request.POST.get("userID", None))
        years = json.loads(request.POST.get("years", None))
        if models.Student.objects.filter(openid=userID):
            message = {"message":"Exist"}
            return HttpResponse(json.dumps(message))
        if course and userInfo and userID and years:
            new_poll = models.Student.objects.create(openid=userID)
            new_poll.nickname = userInfo["nickName"]
            new_poll.gender = userInfo["gender"]
            new_poll.avatarUrl = userInfo["avatarUrl"]
            new_poll.DSA = "DSA" in course
            new_poll.DM = "DM" in  course
            new_poll.EH = "EH" in course
            new_poll.VR = "VR" in course
            new_poll.SD = "SD" in course
            new_poll.SS = "SS" in course
            new_poll.num = new_poll.DSA+ new_poll.DM+new_poll.EH+new_poll.VR+new_poll.SD+new_poll.SS
            if "DSA" in course:
                new_poll.yDSA = years["DSA"]
            if "DM" in course:
                new_poll.yDM = years["DM"]
            if "EH" in course:
                new_poll.yEH = years["EH"]
            if "VR" in course:
                new_poll.yVR = years["VR"]
            if "SD" in course:
                new_poll.ySD = years["SD"]
            if "SS" in course:
                new_poll.ySS = years["SS"]
            new_poll.save()
            exist = models.Student.objects.filter(openid=userID)
            if exist:
                exist = exist.values()[0]
            message = {"message": exist}
            return HttpResponse(json.dumps(message))
    return HttpResponse("Hello")


def id(request):
    code = json.loads(request.POST.get("code"))
    message = {}
    request = urllib.request.Request('https://api.weixin.qq.com/sns/jscode2session?appid=wxdb6a722ec6f7651a&'+\
    'secret=3b25983534b2530f4f6a3a760f61c27b&js_code=%s&grant_type=authorization_code' % code)
    try:
        id = urllib.request.urlopen(request)
        message["succeed"] = True
        data = json.loads(bytes.decode(id.read()))
        userID = data["openid"]
        exist = models.Student.objects.filter(openid=userID)
        if exist:
            exist = exist.values()[0]
            message["message"] = exist
            message["exist"] = True
        else:
            exist = {
                "openid": data["openid"]
            }
            message["message"] = exist
            message["exist"] = False
    except:
        message["succeed"]= False
    return HttpResponse(json.dumps(message))

def delete(request):
    userID = json.loads(request.POST.get("userID"))
    exist = models.Student.objects.filter(openid=userID)
    if exist:
        exist.delete()
        message = {"message": "Done"}
    else:
        message = {"message": "Wrong"}
    return HttpResponse(json.dumps(message))

def rank(request):
    rank = models.Student.objects.all().order_by("num")[:100].values("nickname", "num", "avatarUrl")
    users = []
    for x in rank:
        users.append(x)
    message = {"message": users}
    return HttpResponse(json.dumps(message))


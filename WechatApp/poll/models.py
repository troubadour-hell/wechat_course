from django.db import models

# Create your models here.
class Student(models.Model):
    openid = models.CharField(max_length=128, primary_key=True, null=False, blank=False)
    nickname = models.CharField(max_length=32, null=False, blank=False)
    avatarUrl = models.URLField(max_length=256, null=False, blank=False)
    gender = models.CharField(max_length=8, null=False, default="unKnow")
    DSA = models.BooleanField(null=False, default=False)    #数算
    DM = models.BooleanField(null=False, default=False)     #离散
    EH = models.BooleanField(null=False, default=False)     #地球与人类文明
    VR = models.BooleanField(null=False, default=False)     #虚拟仿真
    SD = models.BooleanField(null=False, default=False)     #空间数据库
    SS = models.BooleanField(null=False, default=False)     #空间信息软件
    yDSA = models.CharField(max_length=8, null=False, default="0")
    yDM = models.CharField(max_length=8, null=False, default="0")
    yEH = models.CharField(max_length=8, null=False, default="0")
    yVR = models.CharField(max_length=8, null=False, default="0")
    ySD = models.CharField(max_length=8, null=False, default="0")
    ySS = models.CharField(max_length=8, null=False, default="0")
    num = models.IntegerField(null=False, default=0)
# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-01-26 16:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poll', '0003_auto_20180125_0241'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='yDM',
            field=models.CharField(default='0', max_length=8),
        ),
        migrations.AddField(
            model_name='student',
            name='yDSA',
            field=models.CharField(default='0', max_length=8),
        ),
        migrations.AddField(
            model_name='student',
            name='yEH',
            field=models.CharField(default='0', max_length=8),
        ),
        migrations.AddField(
            model_name='student',
            name='ySD',
            field=models.CharField(default='0', max_length=8),
        ),
        migrations.AddField(
            model_name='student',
            name='ySS',
            field=models.CharField(default='0', max_length=8),
        ),
        migrations.AddField(
            model_name='student',
            name='yVR',
            field=models.CharField(default='0', max_length=8),
        ),
    ]

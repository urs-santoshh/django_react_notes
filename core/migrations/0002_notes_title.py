# Generated by Django 4.1.4 on 2023-01-04 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notes',
            name='title',
            field=models.TextField(blank=True, null=True),
        ),
    ]

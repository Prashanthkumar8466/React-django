# Generated by Django 3.2.25 on 2024-12-16 06:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Application', '0005_mostview'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mostview',
            name='viewcount',
            field=models.IntegerField(default=1),
        ),
    ]

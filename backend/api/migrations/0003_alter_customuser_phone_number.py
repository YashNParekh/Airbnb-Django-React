# Generated by Django 5.1 on 2024-09-25 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_customuser_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='phone_number',
            field=models.CharField(default='', max_length=15, verbose_name='phone number'),
        ),
    ]

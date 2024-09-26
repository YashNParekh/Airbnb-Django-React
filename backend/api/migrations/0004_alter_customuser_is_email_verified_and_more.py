# Generated by Django 5.1 on 2024-09-26 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_customuser_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='is_email_verified',
            field=models.BooleanField(default=True, verbose_name='email verified'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='username',
            field=models.CharField(max_length=200),
        ),
    ]

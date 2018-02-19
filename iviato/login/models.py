from django.db import models

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    account_name = models.CharField(max_length=32)
    email = models.CharField(max_length=32)
    password = models.CharField(max_length=32)
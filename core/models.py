from django.db import models
from django.contrib.auth.models import User

class Notes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.TextField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    



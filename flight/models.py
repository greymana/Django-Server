from django.db import models
class StateVector(models.Model):
    icao24 = models.CharField(unique=True, default="",max_length = 200)

   	 

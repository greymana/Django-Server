from django import forms
 
from .models import StateVector

from django.forms import ModelForm

from flight.models import StateVector

class FlightModelForm(ModelForm):
    class Meta:
        model = StateVector
        fields = '__all__'
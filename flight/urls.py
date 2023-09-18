from django.urls import path
from flight import views

urlpatterns = [
	path('',views.flightview, name = "flight"),
]

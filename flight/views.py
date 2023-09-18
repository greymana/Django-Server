from django.shortcuts import render

from .forms import FlightModelForm

from .opensky_api import OpenSkyApi

import datetime
 
def flightview(request):

	form = FlightModelForm(request.POST or None, request.FILES or None)
     
	# check if form data is valid
	if form.is_bound and form.is_valid():
    # save the form data to model
		# form.save()
		icao24 = form.cleaned_data['icao24']
		api = OpenSkyApi()
		# "4b1814"
		state = api.get_states(icao24="c00734").states[0]
		time = state.time_position
		latitude = state.latitude
		longitude = state.longitude
		dt = datetime.datetime.fromtimestamp(time)
		context ={"data":dt,"lat":latitude, "long":longitude, "form":form, "test":icao24}
		return render(request, "show.html", context)
	form_only = {"form":form}
	return render(request, "show.html", form_only)

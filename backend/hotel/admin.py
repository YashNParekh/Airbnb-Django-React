from django.contrib import admin



# Register your models here.
from .models import Property, PropertyImage, PropertyType, LocationType, Amenity, Booking
admin.site.register(Property)
admin.site.register(PropertyImage)
admin.site.register(PropertyType)
admin.site.register(LocationType)
admin.site.register(Amenity)
admin.site.register(Booking)

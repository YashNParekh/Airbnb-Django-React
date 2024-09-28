# hotel/models.py

from django.db import models
from api.models import CustomUser


class LocationType(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Ensure unique names
    icon = models.ImageField(upload_to='location_type_icons/', null=True, blank=True)
    icon_name = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name


class Amenity(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Ensure unique names
    icon = models.ImageField(upload_to='amenity_icons/', null=True, blank=True)
    icon_name = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name


class PropertyType(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Ensure unique names
    icon = models.ImageField(upload_to='property_type_icons/', null=True, blank=True)
    icon_name = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name


class Property(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    property_type = models.CharField(max_length=100)
    location_type = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100, db_index=True)  # Indexed for performance
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100, db_index=True)  # Indexed for performance
    latitude = models.FloatField()
    longitude = models.FloatField()
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2, db_index=True)  # Indexed for performance
    bedrooms = models.PositiveIntegerField()
    bathrooms = models.PositiveIntegerField()
    max_guests = models.PositiveIntegerField()
    amenities = models.ManyToManyField(Amenity)
    pets_allowed = models.BooleanField(default=False)
    entire_place = models.BooleanField(default=True)
    rating = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class PropertyImage(models.Model):
    property = models.ForeignKey(Property, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='property_images/')
    is_cover = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.property.title}"


class Booking(models.Model):
    guest = models.ForeignKey(CustomUser, related_name='bookings', on_delete=models.CASCADE)
    property = models.ForeignKey(Property, related_name='bookings', on_delete=models.CASCADE)
    check_in = models.DateField()
    check_out = models.DateField()
    book_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking by {self.guest.username} for {self.property.title}"

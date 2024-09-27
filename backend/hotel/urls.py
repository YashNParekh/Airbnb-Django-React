# hotel/urls.py

from django.urls import path
from .views import (
    PropertyList,
    PropertyDetail,
    PropertyTypeList,
    PropertyTypeCreate,
    LocationTypeList,
    LocationTypeCreate,
    AmenityList,
    AmenityCreate,
    PropertyImageUpload
)

urlpatterns = [
    # Property Endpoints
    path('properties/', PropertyList.as_view(), name='property-list'),
    path('properties/<int:pk>/', PropertyDetail.as_view(), name='property-detail'),
    path('properties/<int:property_id>/upload-image/', PropertyImageUpload.as_view(), name='property-image-upload'),

    # PropertyType Endpoints
    path('property-types/', PropertyTypeList.as_view(), name='property-type-list'),
    path('property-types/create/', PropertyTypeCreate.as_view(), name='property-type-create'),

    # LocationType Endpoints
    path('location-types/', LocationTypeList.as_view(), name='location-type-list'),
    path('location-types/create/', LocationTypeCreate.as_view(), name='location-type-create'),

    # Amenity Endpoints
    path('amenities/', AmenityList.as_view(), name='amenity-list'),
    path('amenities/create/', AmenityCreate.as_view(), name='amenity-create'),
]

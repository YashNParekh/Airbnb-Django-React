# hotel/views.py

from datetime import datetime
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.db.models import Q, Avg
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters,serializers
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import JsonResponse
from rest_framework.exceptions import PermissionDenied


from .models import Booking, LocationType, Amenity, Property, PropertyImage, PropertyType
from .serializers import (
    LocationTypeSerializer,
    AmenitySerializer,
    PropertyImageSerializer,
    PropertySerializer,
    PropertyTypeSerializer
)


# --- List Views ---

class PropertyTypeList(generics.ListAPIView):
    queryset = PropertyType.objects.all()
    serializer_class = PropertyTypeSerializer
    permission_classes = [IsAuthenticated]


class LocationTypeList(generics.ListAPIView):
    queryset = LocationType.objects.all()
    serializer_class = LocationTypeSerializer
    permission_classes = [IsAuthenticated]


class AmenityList(generics.ListAPIView):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer
    permission_classes = [IsAuthenticated]


# --- Create Views ---

class PropertyTypeCreate(generics.CreateAPIView):
    queryset = PropertyType.objects.all()
    serializer_class = PropertyTypeSerializer
    permission_classes = [IsAdminUser]


class LocationTypeCreate(generics.CreateAPIView):
    queryset = LocationType.objects.all()
    serializer_class = LocationTypeSerializer
    permission_classes = [IsAdminUser]


class AmenityCreate(generics.CreateAPIView):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer
    permission_classes = [IsAdminUser]


# --- Other Views ---

class PropertyList(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['property_type', 'location_type', 'city', 'country', 'pets_allowed', 'entire_place']
    search_fields = ['title', 'description', 'address', 'city', 'country']
    ordering_fields = ['price_per_night', 'rating', 'created_at']

    def get_queryset(self):
        queryset = super().get_queryset()

        # Date-based filtering
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if start_date and end_date:
            try:
                start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
                end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
                if start_date > end_date:
                    raise ValueError("start_date cannot be after end_date.")
            except ValueError as ve:
                raise serializers.ValidationError(str(ve))

            unavailable_properties = Booking.objects.filter(
                Q(check_in__lte=end_date) & Q(check_out__gte=start_date)
            ).values_list('property', flat=True)

            queryset = queryset.exclude(id__in=unavailable_properties)

        # Price range filtering
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price:
            queryset = queryset.filter(price_per_night__gte=float(min_price))
        if max_price:
            queryset = queryset.filter(price_per_night__lte=float(max_price))

        # Number of guests filtering
        guests = self.request.query_params.get('guests')
        if guests:
            queryset = queryset.filter(max_guests__gte=int(guests))

        # Amenities filtering
        amenities = self.request.query_params.getlist('amenities')
        if amenities:
            queryset = queryset.filter(amenities__id__in=amenities).distinct()

        # Sorting
        sort_by = self.request.query_params.get('sort_by')
        if sort_by == 'popularity':
            queryset = queryset.annotate(avg_rating=Avg('reviews__rating')).order_by('-avg_rating')
        elif sort_by == 'price_low_to_high':
            queryset = queryset.order_by('price_per_night')
        elif sort_by == 'price_high_to_low':
            queryset = queryset.order_by('-price_per_night')

        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return JsonResponse(serializer.data, status=201, headers=headers)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PropertyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Perform update
        self.perform_update(serializer)

        # Handle image uploads if provided
        images = request.FILES.getlist('images')
        for image in images:
            PropertyImage.objects.create(property=instance, image=image)

        return JsonResponse(serializer.data, status=200)

    def perform_update(self, serializer):
        serializer.save()


class PropertyImageUpload(generics.CreateAPIView):
    queryset = PropertyImage.objects.all()
    serializer_class = PropertyImageSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        property_id = self.kwargs.get('property_id')
        try:
            property_instance = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            raise serializers.ValidationError("Property does not exist.")

        # Optionally, check if the user is the owner
        if property_instance.owner != self.request.user:
            raise PermissionDenied("You do not have permission to add images to this property.")

        serializer.save(property=property_instance)

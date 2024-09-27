
# hotel/serializers.py

from rest_framework import serializers
from .models import Property, PropertyImage, PropertyType, LocationType, Amenity

class PropertyTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyType
        fields = ['id', 'name', 'icon', 'icon_name']


class LocationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationType
        fields = ['id', 'name', 'icon', 'icon_name']


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ['id', 'name', 'icon', 'icon_name']


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'is_cover']

    def validate_image(self, value):
        # Validate file size (e.g., max 2MB)
        limit = 2 * 1024 * 1024  # 2 MB
        if value.size > limit:
            raise serializers.ValidationError('Image file too large. Size should not exceed 2 MB.')

        # Validate file type
        valid_mime_types = ['image/jpeg', 'image/png']
        if value.content_type not in valid_mime_types:
            raise serializers.ValidationError('Unsupported file type. Use JPEG or PNG images.')

        return value


class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    property_type = PropertyTypeSerializer(read_only=True)
    location_type = LocationTypeSerializer(read_only=True)
    amenities = AmenitySerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ['owner', 'rating', 'created_at', 'updated_at']

    def create(self, validated_data):
        property_type_id = self.context['request'].data.get('property_type')
        location_type_id = self.context['request'].data.get('location_type')
        amenity_ids = self.context['request'].data.get('amenities', [])

        property_type = PropertyType.objects.get(id=property_type_id)
        location_type = LocationType.objects.get(id=location_type_id)

        property_instance = Property.objects.create(
            **validated_data,
            property_type=property_type,
            location_type=location_type,
            owner=self.context['request'].user
        )

        property_instance.amenities.set(amenity_ids)

        # Handle image uploads
        images_data = self.context['request'].FILES
        for image_data in images_data.getlist('images'):
            PropertyImage.objects.create(property=property_instance, image=image_data)

        # Set cover image
        cover_image_id = self.context['request'].data.get('cover_image_id')
        if cover_image_id:
            try:
                cover_image = PropertyImage.objects.get(id=cover_image_id, property=property_instance)
                cover_image.is_cover = True
                cover_image.save()
            except PropertyImage.DoesNotExist:
                raise serializers.ValidationError("Cover image not found.")

        return property_instance

    def validate(self, data):
        request = self.context.get('request')
        images_data = request.FILES.getlist('images')

        # Limit the number of images to 5
        if len(images_data) > 5:
            raise serializers.ValidationError("You cannot upload more than 5 images for a property.")

        return data

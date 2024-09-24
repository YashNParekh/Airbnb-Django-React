from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id", "username", "email", "phone_number", "is_email_verified", 
            "is_phone_verified", "date_of_birth", "preferred_name", 
            "government_id", "address", "emergency_contact_name", 
            "emergency_contact_relationship", "emergency_contact_language", 
            "emergency_contact_email", "emergency_contact_phone", 
            "emergency_contact_country_code", "is_host_home", 
            "is_host_experience"
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "is_email_verified": {"read_only": True},
            "is_phone_verified": {"read_only": True}
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
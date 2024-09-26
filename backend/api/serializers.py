from rest_framework import serializers
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email',"username",'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def create(self, validated_data):
        print(validated_data)
        user = CustomUser.objects.create_user(**validated_data)
        return user



class UpdateCustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'email', 
            'username', 
            'password',
            'phone_number',  # Include additional fields as needed
            'date_of_birth',
            'government_id',
            'address',
            'emergency_contact_name',
            'emergency_contact_relationship',
            'emergency_contact_language',
            'emergency_contact_email',
            'emergency_contact_phone',
            'emergency_contact_country_code',
        ]
        extra_kwargs = {
            'password': {'write_only': True},
        }
    def create(self, validated_data):
        print(validated_data)
        user = CustomUser.objects.create_user(**validated_data)
        return user



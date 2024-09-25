import random
from django.core.mail import send_mail
from django.http import JsonResponse
from django.core.cache import cache
from django.conf import settings
from rest_framework import generics,viewsets
from .models import CustomUser
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import CustomUserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken

class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]
        
class EditProfileView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
  
def generate_otp():
    return str(random.randint(100000, 999999))

class UserDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user



@api_view(['POST'])
@permission_classes([AllowAny])
def send_email_otp(request):
    if request.method == 'POST':
        email = request.data.get('email')
        otp = generate_otp()
        
        # Store OTP in cache with 5 minutes expiration
        cache.set(f'email_otp_{email}', otp, 300)
        
        # Send email
        send_mail(
            'Your OTP for Verification',
            f'Your OTP is: {otp}',
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )
        
        return JsonResponse({'message': 'OTP sent to email'})


@api_view(['POST'])
@permission_classes([AllowAny])
def send_phone_otp(request):
    if request.method == 'POST':
        print(request.data)
        phone_number = request.data.get('phone_number')
        otp = generate_otp()
        
        # Store OTP in cache with 5 minutes expiration
        cache.set(f'phone_otp_{phone_number}', otp, 300)
        
        # Print OTP to console instead of sending SMS
        print(f"OTP for {phone_number}: {otp}")
        
        return JsonResponse({'message': 'OTP sent to phone (check console)'})


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_email_otp(request):
    if request.method == 'POST':
        email = request.data.get('email')
        otp = request.data.get('otp')
        user_id = request.data.get('user_id')
        
        stored_otp = cache.get(f'email_otp_{email}')
        
        if stored_otp and stored_otp == otp:
            cache.delete(f'email_otp_{email}')
            if user_id:
                user = CustomUser.objects.get(id=user_id)
                user.is_email_verified = True
                user.save()
            return JsonResponse({'message': 'Email verified successfully'})
        else:
            return JsonResponse({'message': 'Invalid OTP'}, status=400)
        

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_phone_otp(request):
    if request.method == 'POST':
        phone_number = request.data.get('phone_number')
        otp = request.data.get('otp')
        user_id = request.data.get('user_id')
        
        stored_otp = cache.get(f'phone_otp_{phone_number}')
        
        if stored_otp and stored_otp == otp:
            cache.delete(f'phone_otp_{phone_number}')
            if user_id:
                user = CustomUser.objects.get(id=user_id)
                user.is_phone_verified = True
                user.save()
            return JsonResponse({'message': 'Phone number verified successfully'})
        else:
            return JsonResponse({'message': 'Invalid OTP'}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def edit_emergency_contact(request):
    if request.method == 'POST':
        user_id = request.data.get('user_id')
        emergency_contact_name = request.data.get('emergency_contact_name')
        emergency_contact_relationship = request.data.get('emergency_contact_relationship')
        emergency_contact_language = request.data.get('emergency_contact_language')
        emergency_contact_email = request.data.get('emergency_contact_email')
        emergency_contact_phone = request.data.get('emergency_contact_phone')
        emergency_contact_country_code = request.data.get('emergency_contact_country_code')
        
        user = CustomUser.objects.get(id=user_id)
        user.emergency_contact_name = emergency_contact_name
        user.emergency_contact_relationship = emergency_contact_relationship
        user.emergency_contact_language = emergency_contact_language
        user.emergency_contact_email = emergency_contact_email
        user.emergency_contact_phone = emergency_contact_phone
        user.emergency_contact_country_code = emergency_contact_country_code
        user.save()
        return JsonResponse({'message': 'Emergency contact edited successfully'})
    else:
        return JsonResponse({'message': 'Invalid request'}, status=400)

from .models import CustomUser
@api_view(['POST'])
@permission_classes([AllowAny])
def GetToken(request):

    pn = request.data.get('email')
    user = CustomUser.objects.get(email=pn)
    refresh = RefreshToken.for_user(user)

    return JsonResponse(
     {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        },
        status = 200)
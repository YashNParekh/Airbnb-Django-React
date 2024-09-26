from django.urls import path
from . import views

urlpatterns = [
    path('send-email/', views.send_email_otp, name='send_email'),
    path('verify-email/', views.verify_email_otp, name='verify_email'),
    path('create-user/', views.CreateUserView.as_view(), name='create_user'),
    path('edit-profile/', views.EditProfileView.as_view(), name='edit_profile'),
    path('edit-emergency-contact/', views.edit_emergency_contact, name='edit_emergency_contact'),
    path('send-phone/', views.send_phone_otp, name='send_phone'),
    path('verify-phone/', views.verify_phone_otp, name='verify_phone'),
    path("verify-existing/", views.check_unique1, name="verify_existing"),
    path("token-number/", views.Token_by_PhoneNumber, name="token_number"),
    path("user/", views.UserDetailView.as_view(), name="token_email"),
    
]
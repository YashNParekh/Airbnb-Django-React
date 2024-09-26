from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        if not username:
            raise ValueError(_('The Username field must be set'))
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, username, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True, null=False) 
    username = models.CharField(max_length=200)
    email = models.EmailField(_('email address'), unique=True)
    phone_number = models.CharField(_('phone number'), max_length=15, default="")
    is_email_verified = models.BooleanField(_('email verified'), default=True)
    is_phone_verified = models.BooleanField(_('phone verified'), default=False)
    date_of_birth = models.DateField(_('date of birth'), null=True, blank=True)
    preferred_name = models.CharField(_('preferred name'), max_length=150, blank=True)
    government_id = models.CharField(_('government ID'), max_length=50, blank=True)
    address = models.TextField(_('address'), blank=True)
    
    emergency_contact_name = models.CharField(_('emergency contact name'), max_length=150, blank=True)
    emergency_contact_relationship = models.CharField(_('emergency contact relationship'), max_length=50, blank=True)
    emergency_contact_language = models.CharField(_('emergency contact language'), max_length=50, blank=True)
    emergency_contact_email = models.EmailField(_('emergency contact email'), blank=True)
    emergency_contact_phone = models.CharField(_('emergency contact phone'), max_length=15, blank=True)
    emergency_contact_country_code = models.CharField(_('emergency contact country code'), max_length=5, blank=True)

    is_host_home = models.BooleanField(_('is host home'), default=False, blank=True)
    is_host_experience = models.BooleanField(_('is host experience'), default=False, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username



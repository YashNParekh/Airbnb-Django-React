from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    phone_number = models.CharField(_('phone number'), max_length=15, blank=True ,unique=True)
    is_email_verified = models.BooleanField(_('email verified'), default=False)
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

    is_host_home = models.BooleanField(_('is host home'), default=False ,blank=True)
    is_host_experience = models.BooleanField(_('is host experience'), default=False ,blank=True)

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
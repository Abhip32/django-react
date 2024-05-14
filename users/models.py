from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator, MinLengthValidator

class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(
        max_length=255,
        validators=[
            MinLengthValidator(8),
            RegexValidator(
                regex=r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',
                message=(
                    'Password must contain at least one uppercase letter, '
                    'one lowercase letter, one digit, and one special character.'
                ),
            ),
        ],
    )
    watchlists = models.JSONField(default=list)

    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

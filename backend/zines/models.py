from django.db import models
from django.contrib.auth.models import User

class Zine(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='zines')
    title = models.CharField(max_length=255)
    is_public = models.BooleanField(default=False)
    
    # 8 pages
    page1 = models.ImageField(upload_to='zines/pages/', null=True, blank=True)
    page2 = models.ImageField(upload_to='zines/pages/', null=True, blank=True)
    page3 = models.ImageField(upload_to='zines/pages/', null=True, blank=True)
    page4 = models.ImageField(upload_to='zines/pages/', null=True, blank=True)
    page5 = models.ImageField(upload_to='zines/pages/', null=True, blank=True)
    page6 = models.ImageField(upload_to='zines/pages/', null=True, blank=True)
    page_back = models.ImageField(upload_to='zines/pages/', null=True, blank=True)
    page_cover = models.ImageField(upload_to='zines/pages/', null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

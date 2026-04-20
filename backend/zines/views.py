from rest_framework import viewsets, permissions
from .models import Zine
from .serializers import ZineSerializer
from django.contrib.auth.models import User

class ZineViewSet(viewsets.ModelViewSet):
    queryset = Zine.objects.all()
    serializer_class = ZineSerializer
    permission_classes = [permissions.AllowAny] # Phase 1: Allow any for testing

    def perform_create(self, serializer):
        # Use first user or create a dummy one for Phase 1
        user = User.objects.first()
        if not user:
            user = User.objects.create_user(username='dummy', password='password')
        serializer.save(owner=user)

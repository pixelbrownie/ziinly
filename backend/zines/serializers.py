from rest_framework import serializers
from .models import Zine
from django.contrib.auth.models import User

class ZineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zine
        fields = '__all__'
        read_only_fields = ('owner',)

    def create(self, validated_data):
        # We'll handle the owner in the view for now, 
        # or just use a default user since Phase 1 doesn't have auth.
        return super().create(validated_data)

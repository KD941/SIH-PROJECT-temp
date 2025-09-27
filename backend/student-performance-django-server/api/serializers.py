from rest_framework import serializers

class StudentPerformanceSerializer(serializers.Serializer):
    points = serializers.IntegerField(required=True)
    badges = serializers.ListField(child=serializers.CharField(), required=False)
    achievements = serializers.ListField(child=serializers.CharField(), required=False)
    performance = serializers.CharField(required=False)
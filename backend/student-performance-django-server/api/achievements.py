from django.db import models

class Achievement(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    points_required = models.IntegerField()

    def __str__(self):
        return self.name

class AchievementTracker:
    def __init__(self, points):
        self.points = points

    def track_achievements(self):
        achievements = Achievement.objects.filter(points_required__lte=self.points)
        return achievements.values('name', 'description')
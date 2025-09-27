from django.http import JsonResponse
from django.views import View
from .badges import BadgeCalculator
from .achievements import AchievementTracker
from .performance import PerformanceEvaluator
import json

class CalculateView(View):
    def post(self, request):
        data = json.loads(request.body)
        points = data.get('points', 0)

        badge_calculator = BadgeCalculator()
        achievement_tracker = AchievementTracker()
        performance_evaluator = PerformanceEvaluator()

        badges = badge_calculator.calculate_badges(points)
        achievements = achievement_tracker.track_achievements(points)
        performance = performance_evaluator.evaluate_performance(points)

        return JsonResponse({
            'badges': badges,
            'achievements': achievements,
            'performance': performance
        })
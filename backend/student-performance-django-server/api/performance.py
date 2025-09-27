from django.db import models

class PerformanceEvaluator:
    def __init__(self, points):
        self.points = points

    def evaluate_performance(self):
        if self.points >= 90:
            return "Excellent"
        elif self.points >= 75:
            return "Good"
        elif self.points >= 50:
            return "Average"
        else:
            return "Needs Improvement"
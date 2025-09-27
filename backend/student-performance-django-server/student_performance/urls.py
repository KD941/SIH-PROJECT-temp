from django.urls import path
from api import views

urlpatterns = [
    path('calculate/', views.calculate, name='calculate'),
]
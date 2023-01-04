from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from .views import MyTokenObtainPairView

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', views.get_routes, name='view_routes'),
    path('notes/', views.get_notes, name='notes'),
    path('notes/create', views.create_note, name='create_note'),
    path('notes/<str:pk>/update', views.update_note, name='update_note'),
    path('notes/<str:pk>/delete', views.delete_note, name='delete_note'),
    path('notes/<str:pk>/', views.get_note, name='note'),
]
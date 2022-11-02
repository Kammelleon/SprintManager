from django.urls import path, reverse_lazy
from django.contrib.auth import views as auth_views
from .views import SignUpView

app_name = 'users'
urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='login.html',
                                                success_url=reverse_lazy('dashboard:main-dashboard')), name='login'),
    path('signup/', SignUpView.as_view(), name="signup")
]
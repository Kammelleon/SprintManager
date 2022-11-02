from django.contrib.messages.views import SuccessMessageMixin
from django.urls import reverse_lazy
from django.views.generic import CreateView
from .forms import UserRegisterForm


class SignUpView(SuccessMessageMixin, CreateView):
    template_name = 'signup.html'
    success_url = reverse_lazy('users:login')
    form_class = UserRegisterForm
    success_message = "Your profile was created successfully"

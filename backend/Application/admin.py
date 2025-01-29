from django.contrib import admin
from .models import Wishlist,Profile,biggestsales,mostview,Recent,Product
# Register your models here.

@admin.register(Wishlist,Profile,biggestsales,mostview,Recent,Product)
class Admin(admin.ModelAdmin):
    list_display =['id'] 

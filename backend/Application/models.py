from django.db import models
from django.contrib.auth.models import User
class Contact(models.Model):
    Name=models.TextField()
    message=models.TextField()
    email=models.TextField()
    def __str__(self):
        return self.Name
    
class Product(models.Model):
    image=models.ImageField(upload_to='products/')
    image_2=models.ImageField(upload_to='products/')
    image_3=models.ImageField(upload_to='products/')
    image_4=models.ImageField(upload_to='products/')
    image_5=models.ImageField(upload_to='products/')
    Name=models.TextField() 
    category=models.TextField() 
    Brand=models.TextField() 
    price=models.TextField() 
    originalprice=models.DecimalField(max_digits=1000000,decimal_places=2,blank=True)
    description=models.TextField()
    def __str__(self):
        return self.Name

class Cart(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField(default=1)
    def __str__(self):
        return self.user.username
class Wishlist(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)

class Profile(models.Model):  
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    profile=models.ImageField(upload_to='profiles/')
    mobile=models.DecimalField(max_digits=15, decimal_places=0)
    Bio =models.TextField()
    Address=models.TextField()
    
class Recent(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    
class biggestsales(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
class mostview(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    viewcount=models.IntegerField(default=1)

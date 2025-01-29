from rest_framework import serializers
from .models import Contact,Product,Profile,Cart,Wishlist,Recent,biggestsales,mostview
from django.contrib.auth.models import User

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__' 
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','password']
        extra_kwargs ={'password':{'write_only':True}}
    def create(self,validated_data):
        user =User.objects.create_user(**validated_data)
        return user

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','email','username','password']
        extra_kwargs ={'password':{'write_only':True}}
    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'
    def create(self, validated_data):
        image = validated_data.pop('image', None)
        product = Product.objects.create(**validated_data)
        if image:
            product.image = image
            product.save() 
        return product

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            representation['image'] = instance.image.url
        return representation

class ProfileSerializer(serializers.ModelSerializer):
    user = RegisterSerializer(read_only=True) 
    class Meta:
        model = Profile
        fields = '__all__'
    def create(self, validated_data):
        return Profile.objects.create(**validated_data)
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.profile: 
            representation['profile'] = instance.profile.url
        return representation

class CartSerializer(serializers.ModelSerializer):
    product=ProductSerializer(read_only=True)
    class Meta:
        model=Cart
        fields=['id','product','user','quantity']
        
class wishlistSerializer(serializers.ModelSerializer):
    product=ProductSerializer(read_only=True)
    class Meta:
        model= Wishlist
        fields='__all__'

class RecentSerializer(serializers.ModelSerializer):
    product=ProductSerializer()
    class Meta:
        model=Recent
        fields='__all__'

class biggestsalesSerializer(serializers.ModelSerializer):
    product=ProductSerializer()
    class Meta:
        model=biggestsales
        fields='__all__'

class mostviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=mostview
        fields='__all__'
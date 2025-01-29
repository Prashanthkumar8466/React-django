from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import generics
from rest_framework import viewsets, status
from rest_framework.views import APIView

from django.contrib.auth.models import User

from .models import Contact,Product,Profile,Cart,Wishlist,Recent,biggestsales,mostview

from .serializers import ContactSerializer,UserSerializer,RegisterSerializer,ProductSerializer,ProfileSerializer,CartSerializer
from .serializers import wishlistSerializer,RecentSerializer,biggestsalesSerializer,mostviewSerializer
@api_view(['GET'])
@permission_classes([AllowAny]) 
def home(request):
    data={'message':'welcome'}
    return Response(data)

class contactviewset(viewsets.ModelViewSet):
    quertset = Contact.objects.all()
    permission_classes=[AllowAny]
    serializer_class = ContactSerializer
    def get_queryset(self):
        return None

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes=[AllowAny]
    def get_queryset(self):
        return None
class Registerviewset(viewsets.ModelViewSet):
    quertset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes=[AllowAny]
    def get_queryset(self):
        return User.objects.all()

class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes=[AllowAny]
    def get_queryset(self):
        return Product.objects.all()
    
class ProfileViewset(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        user=self.request.user
        return Profile.objects.filter(user=user)
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

class CartViewSet(viewsets.ModelViewSet):
    queryset=Cart.objects.all()
    serializer_class=CartSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        user=self.request.user
        return Cart.objects.filter(user=user)
    def create(self,request,*args, **kwargs):
        user=self.request.user
        id=request.data.get('product_id')
        quantity=request.data.get('quantity')
        product=Product.objects.get(id=id)
        quantity=int(quantity)
        if Cart.objects.filter(product=product,user=user).exists():
            return Response({'message': 'item already exist in cart!'})
        else:
            if (quantity > 1):
                data= Cart.objects.create(user=user,product=product,quantity=quantity)
                data.save()
            else:
                data= Cart.objects.create(user=user,product=product,quantity=1)
                data.save()
        return Response({'message': 'Added to cart successfully!'})

class WishlistViewSet(viewsets.ModelViewSet):
    queryset=Wishlist.objects.all()
    serializer_class=wishlistSerializer
    permission_classes=[AllowAny]
    def get_queryset(self):
        return Wishlist.objects.all()
from django.utils.timezone import now
class RecentViewSet(viewsets.ModelViewSet):
    queryset=Recent.objects.all()
    serializer_class=RecentSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        user=self.request.user
        return Recent.objects.filter(user=user).order_by('-created_at')[:2]
    def create(self,request,*args, **kwargs):
        user=self.request.user
        print(user)
        id=request.data.get('id')
        print('--',id)
        product= Product.objects.get(id=id) 
        if Recent.objects.filter(user=user,product=product).exists():
            recent=Recent.objects.get(user=user,product=product)
            recent.created_at=now()
            recent.save()
        else:
            Recent.objects.create(user=user,product=product)
        return Response()
class biggestsalesViewset(viewsets.ModelViewSet):
    queryset=biggestsales.objects.all()
    serializer_class=biggestsalesSerializer
    permission_classes=[AllowAny]
    def get_queryset(self):
        return biggestsales.objects.all()
    
class mostviewViewSet(viewsets.ModelViewSet):
    queryset=mostview.objects.all()
    serializer_class=mostviewSerializer
    permission_classes=[AllowAny]
    def get_queryset(self):
        return mostview.objects.order_by('-viewcount')[:3 ]
    def create(self,request,*args, **kwargs):
        id=request.data.get('id')
        product=Product.objects.get(id=id)
        if mostview.objects.filter(product=product).exists():
            most=mostview.objects.get(product=product)
            most.viewcount+=1
            most.save()
        else:
            mostview.objects.create(product=product)
        return Response()
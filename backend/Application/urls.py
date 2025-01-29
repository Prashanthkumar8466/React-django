from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import home,contactviewset,Registerviewset,ProductViewset,ProfileViewset,wishlistSerializer,RecentViewSet
from .import views
router = DefaultRouter()
router.register(r'contact',contactviewset,basename='contact')

Register=DefaultRouter()
Register.register(r'register',Registerviewset,basename='register')

Product =DefaultRouter()
Product.register(r'product',ProductViewset,basename='product')

Profile =DefaultRouter()
Profile.register(r'profile',ProfileViewset,basename='profile')


cart=DefaultRouter()
cart.register(r'cart',views.CartViewSet,basename='cart')


wishlist=DefaultRouter()
wishlist.register(r'wishlist',views.WishlistViewSet,basename='wishlist')

biggestsales=DefaultRouter()
biggestsales.register(r'bigsales',views.biggestsalesViewset,basename='bigsales')

recent=DefaultRouter()
recent.register(r'recent',views.RecentViewSet,basename='recent')

most=DefaultRouter()
most.register(r'most',views.mostviewViewSet,basename='most')
urlpatterns = [
    path('', home, name='home'), 
    path('',include(router.urls)),
    path('',include(Register.urls)),
    path('',include(Product.urls)),
    path('',include(Profile.urls)),
    path('',include(cart.urls)),
    path('',include(wishlist.urls)),
    path('',include(recent.urls)),
    path('',include(biggestsales.urls)),
    path('',include(most.urls)),
]

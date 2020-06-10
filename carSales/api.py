from carSales.models import Post
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = [ permissions.AllowAny ]
    serializer_class = PostSerializer


    def destroy(self, request, *args, **kwargs):        
        instance = self.get_object()
        instance.imageA.delete()
        instance.imageB.delete()
        instance.imageC.delete()
        self.perform_destroy(instance)
        
        serializer = PostSerializer(instance)        
        return Response(serializer.data)
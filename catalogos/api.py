from catalogos.models import Grupo,Medida
from rest_framework import viewsets, permissions
from .serializers import GrupoSerializer, MedidaSerializer


class GrupoViewSet (viewsets.ModelViewSet):
    queryset = Grupo.objects.all()
    permissions_classes =  [ permissions.AllowAny]
    serializer_class = GrupoSerializer

class MedidaViewSet (viewsets.ModelViewSet):
    queryset = Medida.objects.all()
    permission_classes = [ permissions.AllowAny]
    serializer_class = MedidaSerializer 
from catalogos.models import Grupo,Medida,Departamento
from rest_framework import viewsets, permissions
from .serializers import GrupoSerializer, MedidaSerializer, DepartamentoSerializer


class GrupoViewSet (viewsets.ModelViewSet):
    queryset = Grupo.objects.all()
    permission_classes = [ permissions.IsAuthenticated ]

    serializer_class = GrupoSerializer

class MedidaViewSet (viewsets.ModelViewSet):
    queryset = Medida.objects.all()
    permission_classes = [ permissions.IsAuthenticated ]
    serializer_class = MedidaSerializer 

class DepartamentoViewSet (viewsets.ModelViewSet):
    queryset = Departamento.objects.all()
    permission_classes = [ permissions.IsAuthenticated ]
    serializer_class = DepartamentoSerializer    
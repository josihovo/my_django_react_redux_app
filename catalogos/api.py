from catalogos.models import Grupo, Producto, Medida,Departamento
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import GrupoSerializer, ProductoSerializer, MedidaSerializer, DepartamentoSerializer

class GrupoViewSet (viewsets.ModelViewSet):
    queryset = Grupo.objects.all()
    permission_classes = [ permissions.IsAuthenticated ]
    serializer_class = GrupoSerializer



class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    permission_classes = [ permissions.IsAuthenticated ]
    serializer_class = ProductoSerializer

    def create(self, request,*args, **kwargs):
        data = request.data

        grupo = Grupo.objects.get(id=data['grupo'])
        prod = Producto.objects.create(
                grupo = grupo,
                clave = data['clave'],
                nombre = data['nombre'],
                )
        prod.save()
        serializer = ProductoSerializer(prod)
        return Response(serializer.data)


class MedidaViewSet (viewsets.ModelViewSet):
    queryset = Medida.objects.all()
    permission_classes = [ permissions.IsAuthenticated ]
    serializer_class = MedidaSerializer 

class DepartamentoViewSet (viewsets.ModelViewSet):
    queryset = Departamento.objects.all()
    permission_classes = [ permissions.IsAuthenticatedOrReadOnly  ]
    serializer_class = DepartamentoSerializer    
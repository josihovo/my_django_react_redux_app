from rest_framework import serializers 
from catalogos.models import Grupo, Producto, Medida, Departamento

class GrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupo 
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
            model = Producto 
            fields = ['id', 'grupo','clave','nombre']
            depth = 1

class MedidaSerializer (serializers.ModelSerializer):
    class Meta:
        model = Medida
        fields = '__all__'


class DepartamentoSerializer (serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = '__all__'        
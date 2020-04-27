from rest_framework import serializers 
from catalogos.models import Grupo, Medida

class GrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupo 
        fields = '__all__'

class MedidaSerializer (serializers.ModelSerializer):
    class Meta:
        model = Medida
        fields = '__all_'
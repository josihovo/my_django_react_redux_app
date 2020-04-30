from django.db import models

# Create your models here.


class Grupo(models.Model):
    clave = models.CharField(max_length=20)
    nombre = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add = True) 


class Medida(models.Model):
    clave = models.CharField(max_length=20)
    nombre = models.CharField(max_length=256)    
    created_at = models.DateTimeField(auto_now_add= True)
    


class Departamento(models.Model):
    clave = models.CharField(max_length=20)
    nombre = models.CharField(max_length=256)
    encargado = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)
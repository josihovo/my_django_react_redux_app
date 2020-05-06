from django.db import models

# Create your models here.


class Grupo(models.Model):
    clave = models.CharField(max_length=20)
    nombre = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add = True) 

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    grupo = models.ForeignKey(Grupo, on_delete=models.SET_NULL, null=True)
    clave = models.CharField(max_length=20)
    nombre =models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre

class Medida(models.Model):
    clave = models.CharField(max_length=20)
    nombre = models.CharField(max_length=256)    
    created_at = models.DateTimeField(auto_now_add= True)

    def __str__(self):
        return self.clave + ' ' + self.nombre
    
class Departamento(models.Model):
    clave = models.CharField(max_length=20)
    nombre = models.CharField(max_length=256)
    encargado = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)
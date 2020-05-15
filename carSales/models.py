from django.db import models

# Create your models here.

class Post(models.Model):
    marca = models.CharField(max_length=100)
    linea = models.CharField(max_length=100)
    modelo = models.IntegerField()
    precio = models.FloatField()
    telefono = models.CharField(max_length=50)
    comentarios = models.TextField()
    ciudad = models.CharField(max_length=100, null=True)
    imageA = models.ImageField(upload_to='post_images')
    imageB = models.ImageField(upload_to='post_images',null=True, blank=True)
    imageC = models.ImageField(upload_to ='post_images', null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) :
        return self. marca + ' ' + self.linea + '(' + self.modelo + ')'

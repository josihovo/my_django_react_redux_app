from rest_framework import routers
from .api import GrupoViewSet, ProductoViewSet, MedidaViewSet, DepartamentoViewSet

router = routers.DefaultRouter()
router.register('api/grupos', GrupoViewSet)
router.register('api/medidas', MedidaViewSet)
router.register('api/departamentos', DepartamentoViewSet)
router.register('api/productos',ProductoViewSet)

urlpatterns = router.urls


from rest_framework import routers
from .api import GrupoViewSet, MedidaViewSet, DepartamentoViewSet

router = routers.DefaultRouter()
router.register('api/grupos', GrupoViewSet)
router.register('api/medidas', MedidaViewSet)
router.register('api/departamentos', DepartamentoViewSet)


urlpatterns = router.urls


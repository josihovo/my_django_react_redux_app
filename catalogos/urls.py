from rest_framework import routers
from .api import GrupoViewSet, MedidaViewSet

router = routers.DefaultRouter()
router.register('api/grupos',GrupoViewSet)
router.register('api/medidas',MedidaViewSet)


urlpatterns = router.urls


from wheresmyjab.api.routing import DefaultRouterPlusPlus
from . import subscribe

router = DefaultRouterPlusPlus()

# Legacy endpoints
router.register(r"subscribe", subscribe.SubscribeViewSet, basename='subscribe')

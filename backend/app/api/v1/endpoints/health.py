from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()


@router.get("/health", tags=["Health"])
async def health_check():
    """
    Service health check endpoint.
    """
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "tagline": settings.TAGLINE,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
    }

from typing import Optional
from supabase import create_client, Client
from app.core.config import settings

_supabase_client: Optional[Client] = None


def get_supabase_client() -> Optional[Client]:
    """
    Initializes and returns a cached Supabase client instance.
    Returns None if SUPABASE_URL or SUPABASE_KEY are not yet configured.
    """
    global _supabase_client
    if _supabase_client is not None:
        return _supabase_client

    if settings.SUPABASE_URL and settings.SUPABASE_KEY:
        _supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        return _supabase_client

    return None

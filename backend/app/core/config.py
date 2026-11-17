from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "BILLORA API"
    TAGLINE: str = "Track Smart. Spend Better."
    VERSION: str = "0.1.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Server Configuration
    BACKEND_HOST: str = "0.0.0.0"
    BACKEND_PORT: int = 8000

    # CORS Configuration
    CORS_ORIGINS: Union[List[str], str] = ["http://localhost:5173"]

    @field_validator("CORS_ORIGINS", mode="before")
    def parse_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        return v

    # Supabase Configuration
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""

    # Database Configuration (Supabase PostgreSQL)
    DATABASE_URL: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()

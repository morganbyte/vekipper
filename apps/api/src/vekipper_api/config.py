from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configuración leída de variables de entorno (o de un archivo .env)."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # development | staging | production
    environment: str = "development"
    # Orígenes que pueden llamar a la API desde el navegador (el frontend).
    cors_origins: list[str] = ["http://localhost:3000"]
    supabase_url: str = ""
    # Clave secreta (sb_secret_...): se salta RLS, solo para operaciones del servidor.
    # Los JWT de usuarios se verifican con las claves públicas (JWKS), sin secreto.
    supabase_secret_key: str = ""


@lru_cache
def get_settings() -> Settings:
    return Settings()

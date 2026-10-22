from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from vekipper_api import __version__
from vekipper_api.config import get_settings

settings = get_settings()

app = FastAPI(title="Vekipper API", version=__version__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    """Comprobación simple de que la API está viva."""
    return {"status": "ok", "version": __version__}

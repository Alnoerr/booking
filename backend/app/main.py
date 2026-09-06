from fastapi import FastAPI

from . import models
from .database import Base, engine
from .routes.locations import router as locations_router


app = FastAPI(title="Обмен книгами")
app.include_router(locations_router)


@app.on_event("startup")
def create_tables() -> None:
    Base.metadata.create_all(bind=engine)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

from fastapi import FastAPI

from . import models
from .database import Base, engine
from .routes.auth import router as auth_router
from .routes.books import router as books_router
from .routes.locations import router as locations_router
from .routes.reservations import router as reservations_router
from .routes.statistics import router as statistics_router


app = FastAPI(title="Обмен книгами")
app.include_router(auth_router)
app.include_router(books_router)
app.include_router(locations_router)
app.include_router(reservations_router)
app.include_router(statistics_router)


@app.on_event("startup")
def create_tables() -> None:
    Base.metadata.create_all(bind=engine)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

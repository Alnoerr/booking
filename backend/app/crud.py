from sqlalchemy import select
from sqlalchemy.orm import Session

from . import models, schemas


def get_locations(db: Session) -> list[models.Location]:
    return list(db.scalars(select(models.Location).order_by(models.Location.id)))


def get_location(db: Session, location_id: int) -> models.Location | None:
    return db.get(models.Location, location_id)


def create_location(db: Session, data: schemas.LocationCreate) -> models.Location:
    location = models.Location(**data.model_dump())
    db.add(location)
    db.commit()
    db.refresh(location)
    return location


def update_location(
    db: Session, location: models.Location, data: schemas.LocationUpdate
) -> models.Location:
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(location, key, value)
    db.commit()
    db.refresh(location)
    return location


def delete_location(db: Session, location: models.Location) -> None:
    db.delete(location)
    db.commit()


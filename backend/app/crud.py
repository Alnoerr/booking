from datetime import date, timedelta

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


def get_books(db: Session) -> list[models.Book]:
    return list(db.scalars(select(models.Book).order_by(models.Book.id)))


def get_book(db: Session, book_id: int) -> models.Book | None:
    return db.get(models.Book, book_id)


def create_book(db: Session, data: schemas.BookCreate) -> models.Book:
    book = models.Book(**data.model_dump())
    db.add(book)
    db.commit()
    db.refresh(book)
    return book


def update_book(db: Session, book: models.Book, data: schemas.BookUpdate) -> models.Book:
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(book, key, value)
    db.commit()
    db.refresh(book)
    return book


def delete_book(db: Session, book: models.Book) -> None:
    db.delete(book)
    db.commit()


def get_reservations(db: Session) -> list[models.Reservation]:
    return list(db.scalars(select(models.Reservation).order_by(models.Reservation.id)))


def get_reservation(db: Session, reservation_id: int) -> models.Reservation | None:
    return db.get(models.Reservation, reservation_id)


def create_reservation(db: Session, book: models.Book) -> models.Reservation:
    reservation = models.Reservation(
        book_id=book.id,
        due_date=date.today() + timedelta(days=21),
    )
    book.available = False
    db.add(reservation)
    db.commit()
    db.refresh(reservation)
    return reservation


def update_reservation(
    db: Session, reservation: models.Reservation, status: str
) -> models.Reservation:
    reservation.status = status
    if status == "returned":
        reservation.returned_at = date.today()
        reservation.book.available = True
    if status == "cancelled":
        reservation.book.available = True
    db.commit()
    db.refresh(reservation)
    return reservation


def delete_reservation(db: Session, reservation: models.Reservation) -> None:
    if reservation.status == "active":
        reservation.book.available = True
    db.delete(reservation)
    db.commit()


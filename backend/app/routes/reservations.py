from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db


router = APIRouter(prefix="/reservations", tags=["reservations"])


@router.get("", response_model=list[schemas.ReservationRead])
def list_reservations(db: Session = Depends(get_db)):
    return crud.get_reservations(db)


@router.get("/{reservation_id}", response_model=schemas.ReservationRead)
def get_reservation(reservation_id: int, db: Session = Depends(get_db)):
    reservation = crud.get_reservation(db, reservation_id)
    if reservation is None:
        raise HTTPException(status_code=404, detail="Бронирование не найдено")
    return reservation


@router.post("", response_model=schemas.ReservationRead, status_code=status.HTTP_201_CREATED)
def create_reservation(data: schemas.ReservationCreate, db: Session = Depends(get_db)):
    book = crud.get_book(db, data.book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="Книга не найдена")
    if not book.available:
        raise HTTPException(status_code=409, detail="Книга уже забронирована")
    return crud.create_reservation(db, book)


@router.patch("/{reservation_id}", response_model=schemas.ReservationRead)
def update_reservation(
    reservation_id: int,
    data: schemas.ReservationUpdate,
    db: Session = Depends(get_db),
):
    reservation = crud.get_reservation(db, reservation_id)
    if reservation is None:
        raise HTTPException(status_code=404, detail="Бронирование не найдено")
    return crud.update_reservation(db, reservation, data.status)


@router.delete("/{reservation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_reservation(reservation_id: int, db: Session = Depends(get_db)):
    reservation = crud.get_reservation(db, reservation_id)
    if reservation is None:
        raise HTTPException(status_code=404, detail="Бронирование не найдено")
    crud.delete_reservation(db, reservation)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


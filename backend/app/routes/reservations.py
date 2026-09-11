from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from .. import dao, models, schemas
from ..database import get_db
from ..dependencies import get_current_user


router = APIRouter(prefix="/reservations", tags=["reservations"])


@router.get("", response_model=list[schemas.ReservationRead])
def list_reservations(
    db: Session = Depends(get_db), user: models.User = Depends(get_current_user)
):
    return dao.get_reservations(db, user.id)


@router.get("/{reservation_id}", response_model=schemas.ReservationRead)
def get_reservation(
    reservation_id: int,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    reservation = dao.get_reservation(db, reservation_id, user.id)
    if reservation is None:
        raise HTTPException(status_code=404, detail="Бронирование не найдено")
    return reservation


@router.post("", response_model=schemas.ReservationRead, status_code=status.HTTP_201_CREATED)
def create_reservation(
    data: schemas.ReservationCreate,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    book = dao.get_book(db, data.book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="Книга не найдена")
    if not book.available:
        raise HTTPException(status_code=409, detail="Книга уже забронирована")
    return dao.create_reservation(db, book, user.id)


@router.patch("/{reservation_id}", response_model=schemas.ReservationRead)
def update_reservation(
    reservation_id: int,
    data: schemas.ReservationUpdate,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    reservation = dao.get_reservation(db, reservation_id, user.id)
    if reservation is None:
        raise HTTPException(status_code=404, detail="Бронирование не найдено")
    return dao.update_reservation(db, reservation, data.status)


@router.delete("/{reservation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_reservation(
    reservation_id: int,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    reservation = dao.get_reservation(db, reservation_id, user.id)
    if reservation is None:
        raise HTTPException(status_code=404, detail="Бронирование не найдено")
    dao.delete_reservation(db, reservation)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

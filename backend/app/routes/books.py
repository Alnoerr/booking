from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from .. import dao, models, schemas
from ..database import get_db
from ..dependencies import get_current_user


router = APIRouter(prefix="/books", tags=["books"])


@router.get("", response_model=list[schemas.BookRead])
def list_books(db: Session = Depends(get_db)):
    return dao.get_books(db)


@router.get("/{book_id}", response_model=schemas.BookRead)
def get_book(book_id: int, db: Session = Depends(get_db)):
    book = dao.get_book(db, book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="Книга не найдена")
    return book


@router.post("", response_model=schemas.BookRead, status_code=status.HTTP_201_CREATED)
def create_book(
    data: schemas.BookCreate,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    if dao.get_location(db, data.location_id) is None:
        raise HTTPException(status_code=400, detail="Место выдачи не найдено")
    return dao.create_book(db, data, user.id)


@router.patch("/{book_id}", response_model=schemas.BookRead)
def update_book(
    book_id: int,
    data: schemas.BookUpdate,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    book = dao.get_book(db, book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="Книга не найдена")
    if book.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Нельзя изменить чужую книгу")
    if data.location_id is not None and dao.get_location(db, data.location_id) is None:
        raise HTTPException(status_code=400, detail="Место выдачи не найдено")
    return dao.update_book(db, book, data)


@router.delete("/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(
    book_id: int,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    book = dao.get_book(db, book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="Книга не найдена")
    if book.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Нельзя удалить чужую книгу")
    if book.reservations:
        raise HTTPException(status_code=409, detail="У книги есть бронирования")
    dao.delete_book(db, book)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

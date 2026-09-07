from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db


router = APIRouter(prefix="/books", tags=["books"])


@router.get("", response_model=list[schemas.BookRead])
def list_books(db: Session = Depends(get_db)):
    return crud.get_books(db)


@router.get("/{book_id}", response_model=schemas.BookRead)
def get_book(book_id: int, db: Session = Depends(get_db)):
    book = crud.get_book(db, book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="Книга не найдена")
    return book


@router.post("", response_model=schemas.BookRead, status_code=status.HTTP_201_CREATED)
def create_book(data: schemas.BookCreate, db: Session = Depends(get_db)):
    if crud.get_location(db, data.location_id) is None:
        raise HTTPException(status_code=400, detail="Место выдачи не найдено")
    return crud.create_book(db, data)


@router.patch("/{book_id}", response_model=schemas.BookRead)
def update_book(book_id: int, data: schemas.BookUpdate, db: Session = Depends(get_db)):
    book = crud.get_book(db, book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="Книга не найдена")
    if data.location_id is not None and crud.get_location(db, data.location_id) is None:
        raise HTTPException(status_code=400, detail="Место выдачи не найдено")
    return crud.update_book(db, book, data)


@router.delete("/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(book_id: int, db: Session = Depends(get_db)):
    book = crud.get_book(db, book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="Книга не найдена")
    if book.reservations:
        raise HTTPException(status_code=409, detail="У книги есть бронирования")
    crud.delete_book(db, book)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


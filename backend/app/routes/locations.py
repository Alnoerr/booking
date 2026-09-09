from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from .. import dao, schemas
from ..database import get_db


router = APIRouter(prefix="/locations", tags=["locations"])


@router.get("", response_model=list[schemas.LocationRead])
def list_locations(db: Session = Depends(get_db)):
    return dao.get_locations(db)


@router.get("/{location_id}", response_model=schemas.LocationRead)
def get_location(location_id: int, db: Session = Depends(get_db)):
    location = dao.get_location(db, location_id)
    if location is None:
        raise HTTPException(status_code=404, detail="Место выдачи не найдено")
    return location


@router.post("", response_model=schemas.LocationRead, status_code=status.HTTP_201_CREATED)
def create_location(data: schemas.LocationCreate, db: Session = Depends(get_db)):
    return dao.create_location(db, data)


@router.patch("/{location_id}", response_model=schemas.LocationRead)
def update_location(
    location_id: int, data: schemas.LocationUpdate, db: Session = Depends(get_db)
):
    location = dao.get_location(db, location_id)
    if location is None:
        raise HTTPException(status_code=404, detail="Место выдачи не найдено")
    return dao.update_location(db, location, data)


@router.delete("/{location_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_location(location_id: int, db: Session = Depends(get_db)):
    location = dao.get_location(db, location_id)
    if location is None:
        raise HTTPException(status_code=404, detail="Место выдачи не найдено")
    if location.books:
        raise HTTPException(status_code=409, detail="В месте выдачи есть книги")
    dao.delete_location(db, location)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

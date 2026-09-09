from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import dao, schemas
from ..database import get_db


router = APIRouter(prefix="/statistics", tags=["statistics"])


@router.get("", response_model=schemas.StatisticsRead)
def get_statistics(db: Session = Depends(get_db)):
    return dao.get_statistics(db)

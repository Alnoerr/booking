from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from . import auth, dao, models
from .database import get_db


security = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
    db: Session = Depends(get_db),
) -> models.User:
    if credentials is None:
        raise HTTPException(status_code=401, detail="Требуется вход")

    user_id = auth.decode_access_token(credentials.credentials)
    user = dao.get_user(db, user_id) if user_id else None
    if user is None:
        raise HTTPException(status_code=401, detail="Access token недействителен")
    return user


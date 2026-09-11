from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from .. import auth, dao, schemas
from ..database import get_db


router = APIRouter(prefix="/auth", tags=["auth"])


def issue_tokens(db: Session, user_id: int) -> schemas.TokenPair:
    refresh, token_hash, expires = auth.create_refresh_token()
    dao.save_refresh_token(db, user_id, token_hash, expires)
    return schemas.TokenPair(
        access_token=auth.create_access_token(user_id),
        refresh_token=refresh,
    )


@router.post("/register", response_model=schemas.TokenPair, status_code=status.HTTP_201_CREATED)
def register(data: schemas.UserRegister, db: Session = Depends(get_db)):
    if dao.get_user_by_email(db, data.email):
        raise HTTPException(status_code=409, detail="Пользователь уже существует")
    user = dao.create_user(db, data.email, auth.hash_password(data.password))
    return issue_tokens(db, user.id)


@router.post("/login", response_model=schemas.TokenPair)
def login(data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = dao.get_user_by_email(db, data.email)
    if user is None or not auth.verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Неверная почта или пароль")
    return issue_tokens(db, user.id)


@router.post("/refresh", response_model=schemas.TokenPair)
def refresh(data: schemas.RefreshRequest, db: Session = Depends(get_db)):
    token = dao.get_refresh_token(db, auth.hash_refresh_token(data.refresh_token))
    if token is None or token.revoked or token.expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Refresh token недействителен")
    dao.revoke_refresh_token(db, token)
    return issue_tokens(db, token.user_id)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(data: schemas.RefreshRequest, db: Session = Depends(get_db)):
    token = dao.get_refresh_token(db, auth.hash_refresh_token(data.refresh_token))
    if token:
        dao.revoke_refresh_token(db, token)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


from datetime import date, datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=100)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserRead(BaseModel):
    id: int
    email: EmailStr
    model_config = ConfigDict(from_attributes=True)


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshRequest(BaseModel):
    refresh_token: str


class LocationCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    address: str = Field(min_length=1, max_length=200)
    working_hours: str = Field(min_length=1, max_length=100)


class LocationUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=100)
    address: str | None = Field(default=None, min_length=1, max_length=200)
    working_hours: str | None = Field(default=None, min_length=1, max_length=100)


class LocationRead(LocationCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)


class BookCreate(BaseModel):
    title: str = Field(min_length=1, max_length=150)
    author: str = Field(min_length=1, max_length=150)
    genre: str = Field(min_length=1, max_length=80)
    year: int = Field(ge=1, le=2100)
    description: str = Field(default="", max_length=1000)
    available: bool = True
    location_id: int


class BookUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=150)
    author: str | None = Field(default=None, min_length=1, max_length=150)
    genre: str | None = Field(default=None, min_length=1, max_length=80)
    year: int | None = Field(default=None, ge=1, le=2100)
    description: str | None = Field(default=None, max_length=1000)
    available: bool | None = None
    location_id: int | None = None


class BookRead(BookCreate):
    id: int
    owner_id: int
    model_config = ConfigDict(from_attributes=True)


class ReservationCreate(BaseModel):
    book_id: int


class ReservationUpdate(BaseModel):
    status: Literal["returned", "cancelled"]


class ReservationRead(BaseModel):
    id: int
    book_id: int
    user_id: int
    status: str
    reserved_at: datetime
    due_date: date
    returned_at: date | None
    book: BookRead
    model_config = ConfigDict(from_attributes=True)


class StatisticsRead(BaseModel):
    books: int
    reservations: int
    active_reservations: int

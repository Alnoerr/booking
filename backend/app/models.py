from datetime import date, datetime

from sqlalchemy import Boolean, Date, DateTime, ForeignKey, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(200), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(300))

    books: Mapped[list["Book"]] = relationship(back_populates="owner")
    reservations: Mapped[list["Reservation"]] = relationship(back_populates="user")
    refresh_tokens: Mapped[list["RefreshToken"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id: Mapped[int] = mapped_column(primary_key=True)
    token_hash: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    revoked: Mapped[bool] = mapped_column(Boolean, default=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    user: Mapped[User] = relationship(back_populates="refresh_tokens")


class Location(Base):
    __tablename__ = "locations"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    address: Mapped[str] = mapped_column(String(200))
    working_hours: Mapped[str] = mapped_column(String(100))

    books: Mapped[list["Book"]] = relationship(back_populates="location")


class Book(Base):
    __tablename__ = "books"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(150))
    author: Mapped[str] = mapped_column(String(150))
    genre: Mapped[str] = mapped_column(String(80))
    year: Mapped[int]
    description: Mapped[str] = mapped_column(String(1000), default="")
    available: Mapped[bool] = mapped_column(Boolean, default=True)
    location_id: Mapped[int] = mapped_column(ForeignKey("locations.id"))
    owner_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    location: Mapped[Location] = relationship(back_populates="books")
    owner: Mapped[User] = relationship(back_populates="books")
    reservations: Mapped[list["Reservation"]] = relationship(back_populates="book")


class Reservation(Base):
    __tablename__ = "reservations"

    id: Mapped[int] = mapped_column(primary_key=True)
    book_id: Mapped[int] = mapped_column(ForeignKey("books.id"))
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    status: Mapped[str] = mapped_column(String(20), default="active")
    reserved_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    due_date: Mapped[date] = mapped_column(Date)
    returned_at: Mapped[date | None] = mapped_column(Date, nullable=True)

    book: Mapped[Book] = relationship(back_populates="reservations")
    user: Mapped[User] = relationship(back_populates="reservations")

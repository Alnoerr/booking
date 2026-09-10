# Обмен книгами

Сервис для каталога книг, бронирований, сроков возврата и мест выдачи.

## Стек

- frontend: React, TypeScript, Material UI;
- backend: FastAPI, SQLAlchemy;
- база данных: PostgreSQL;
- запуск: Docker Compose.

## Запуск

```
Copy-Item .env.example .env
```

Задать пароль в `.env`, затем выполнить:

```
docker compose up --build
```

- frontend: `http://127.0.0.1:5173`;
- API: `http://127.0.0.1:8001`;
- Swagger: `http://127.0.0.1:8001/docs`.

Остановка:

```
docker compose down
```

## Данные

- `Location` — место выдачи;
- `Book` — книга, связанная с местом выдачи;
- `Reservation` — бронирование книги со сроком возврата.

## API

- `/locations` — места выдачи;
- `/books` — книги;
- `/reservations` — бронирования;
- `/statistics` — статистика;
- `/health` — проверка backend.

Для мест выдачи, книг и бронирований доступны создание, чтение, изменение и удаление. Срок бронирования — 21 день.

Frontend лабораторной №1 использует демонстрационные данные.

## Структура frontend

- `app` — маршруты и тема;
- `pages` — страницы;
- `features` — действия пользователя;
- `entities` — данные и компоненты сущностей;
- `shared` — общие компоненты.

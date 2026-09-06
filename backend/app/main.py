from fastapi import FastAPI


app = FastAPI(title="Обмен книгами")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
from dotenv import load_dotenv

load_dotenv()



FRONTEND_URL = os.getenv("FRONTEND_URL")  # set this on Render

origins = [
    FRONTEND_URL,
    "http://localhost:3000"  # para desenvolvimento local
]

API_KEY = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,              # Lista de origens permitidas
    allow_credentials=True,             # Permite cookies de autenticação (se estiver usando)
    allow_methods=["*"],                # Permite todos os métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],                # Permite todos os cabeçalhos em requisições
)

@app.get("/")
def root():
    return {"message": "Backend FastAPI funcionando!"}


@app.get("/weather")
async def get_weather(city: str):
    if not API_KEY or not BASE_URL:
        raise HTTPException(
            status_code=500,
            detail="API_KEY ou BASE_URL não configurados no .env"
        )

    params = {
        "key": API_KEY,
        "q": city,
        "aqi": "yes"
    }

    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(BASE_URL, params=params)

        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail=response.json()
            )

        return response.json()

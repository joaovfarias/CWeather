# 🌤️ CWeather
CWeather is a web application that displays real-time weather data with clean and simple CSS-based visuals.
The project is built with Next.js on the frontend and FastAPI on the backend, consuming data from the WeatherAPI service.

Live Demo: 
- https://c-weather.vercel.app/

# 🚀 Tech Stack
- Frontend: Next.js
- Backend: FastAPI (Python)
- Weather Data: WeatherAPI
- Styling: CSS

# ✨ Features
- Real-time weather information
- Clean and responsive UI
- Visual weather representation using CSS
- Separation between frontend and backend

# 📦 Project Structure
```
/frontend   -> Next.js application
/backend    -> FastAPI server
```

# ⚙️ Setup & Installation
1. Clone the repo
```
git clone https://github.com/joaovfarias/CWeather.git
```
2. Backend (FastAPI)
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Make sure to create a .env file and add your WeatherAPI key:
```
WEATHER_API_KEY=your_api_key_here
```
3. Frontend (Next.js)
```
cd frontend
npm install
npm run dev
```
# 🌍 API Used
- WeatherAPI – provides real-time weather data
- https://www.weatherapi.com/

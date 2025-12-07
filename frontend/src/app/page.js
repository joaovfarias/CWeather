"use client";

import { useState } from "react";
import SunnyBackground from "../../components/sunnybackground";
import NightBackground from "../../components/nightbackground";
import ModerateRainBackground from "../../components/rainbackground";
import ThunderStormBackground from "../../components/thunderstormbackground";
import OvercastBackground from "../../components/overcastbackground";
import SnowBackground from "../../components/snowbackground";

export default function Home() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [condition, setCondition] = useState(null);

  async function searchWeather() {
    if (!city.trim()) return setError("Digite uma cidade");

    setLoading(true);
    setError(null);

    try {
      const base =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      const res = await fetch(
        `${base}/weather?city=${encodeURIComponent(city)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        let errText = `Erro ${res.status}`;
        try {
          const errJson = await res.json();
          errText = JSON.stringify(errJson);
        } catch {
          errText = await res.text();
        }
        throw new Error(errText);
      }

      const json = await res.json();
      setData(json);
      setCondition(json.current?.condition.text || null);
    } catch (err) {
      setError(err?.message ?? "Erro desconhecido");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="">
      {!data ? (
        <div className="min-h-screen flex flex-col items-center justify-center night-sky px-4">
          <h1 className="text-5xl text-white mb-4 text-center">CWeather</h1>
          <p className="text-1xl text-white mb-6 text-center">
            Get real time weather data with visuals.
          </p>
          <div className="flex flex-col gap-3 w-full max-w-sm">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search (e.g., London)"
              className="w-full p-3 rounded-md border border-white/20 bg-white/5 text-white placeholder-white/70"
            />
            <button
              onClick={searchWeather}
              className="w-full px-6 py-3 rounded-md bg-blue-900 text-white disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>

            {error && (
              <div className="text-red-500 mt-2 text-center">
                {"Type a valid location"}
              </div>
            )}

            <p className="text-white/70 mt-4 text-center">
              Powered by{" "}
              <a
                href="https://www.weatherapi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                WeatherAPI.com
              </a>
            </p>

            <p className="text-white/50 mt-2 text-center text-sm">
              Created by{" "}
              <a
                href="https://github.com/joaovfarias"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                joaovfarias
              </a>
            </p>
          </div>

          <footer className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-white/50 text-center text-sm">
            First search may take up to 50 seconds.
          </footer>
        </div>
      ) : (
        <main className="relative min-h-screen text-white">
          <div className="absolute inset-0">
            {(condition?.toLowerCase().includes("overcast") ||
              condition?.toLowerCase().includes("mist") ||
              condition?.toLowerCase().includes("fog")) &&
            data.current?.is_day === 1 ? (
              <OvercastBackground />
            ) : condition?.toLowerCase().includes("rain") ||
              condition?.toLowerCase().includes("drizzle") ||
              condition?.toLowerCase().includes("sleet") ? (
              <ModerateRainBackground />
            ) : condition?.toLowerCase().includes("thundery") ? (
              <ThunderStormBackground />
            ) : condition?.toLowerCase().includes("snow") ||
              condition?.toLowerCase().includes("blizzard") ? (
              <SnowBackground />
            ) : data.current?.is_day === 1 ? (
              <SunnyBackground />
            ) : (
              <NightBackground />
            )}
          </div>
          <div className="relative w-full grid grid-cols-3 items-start mb-4 px-7 py-6">
            {/* Left corner */}
            <div className="text-left">
              <p className="text-2xl"> Humidity: {data.current?.humidity}%</p>
              <p className="text-2xl">{data.current?.condition.text}</p>
            </div>

            {/* Center */}
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-1">{data.location.name}</h1>
              <p className="text-4xl">{Math.round(data.current.temp_c)}°C</p>
            </div>

            {/* Right corner */}
            <div className="text-right">
              <p className="text-2xl">
                {data.location.localtime.split(" ")[0]}
              </p>
              <p className="text-2xl">
                {data.location.localtime.split(" ")[1]}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setData(null);
              setCondition(null);
              setCity("");
              setError(null);
            }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-white hover:opacity-70 transition"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </main>
      )}
    </main>
  );
}

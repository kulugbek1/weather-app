import type { ForecastData, GeoLocation, WeatherData } from "../types/weather.types";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

async function fetchJson<T>(url: string, errorMessage: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

export async function searchLocations(query: string): Promise<GeoLocation[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return fetchJson<GeoLocation[]>(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(trimmed)}&limit=5&appid=${API_KEY}`,
    "Failed to search locations"
  );
}

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  return fetchJson<WeatherData>(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
    "Failed to fetch weather"
  );
}

export async function getForecast(city: string): Promise<ForecastData> {
  return fetchJson<ForecastData>(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
    "Failed to fetch forecast"
  );
}

export async function getCurrentWeatherByCoords(
  lat: number,
  lon: number
): Promise<WeatherData> {
  return fetchJson<WeatherData>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    "Failed to fetch weather"
  );
}

export async function getForecastByCoords(
  lat: number,
  lon: number
): Promise<ForecastData> {
  return fetchJson<ForecastData>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    "Failed to fetch forecast"
  );
}

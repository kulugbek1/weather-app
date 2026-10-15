import './App.css'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { MainCard } from './components/MainCard'
import { Info } from './components/Info'
import { Daily } from './components/Daily'
import { Hourly } from './components/Hourly'

import {
  getCurrentWeatherByCoords,
  getForecastByCoords,
  searchLocations,
} from "./services/weatherApi";
import { useEffect, useRef, useState } from 'react'
import type {
  ForecastData,
  GeoLocation,
  UnitsPreferences,
  WeatherData,
} from './types/weather.types'
import {
  buildDailyForecast,
  buildDayOptions,
  buildHourlyForecast,
} from './utils/forecast'
import {
  convertPrecipitation,
  convertTemperature,
  convertWind,
  defaultUnits,
  precipitationLabel,
  windLabel,
} from './utils/units'
import { formatLocation } from './utils/location'

type ViewState = "loading" | "ready" | "no-results";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [units, setUnits] = useState<UnitsPreferences>(defaultUnits);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
  const [viewState, setViewState] = useState<ViewState>("loading");
  const skipSuggestRef = useRef(false);

  async function loadWeatherForLocation(location: GeoLocation) {
    setViewState("loading");
    setSuggestions([]);
    skipSuggestRef.current = true;
    setQuery(location.name);

    try {
      const [current, forecast] = await Promise.all([
        getCurrentWeatherByCoords(location.lat, location.lon),
        getForecastByCoords(location.lat, location.lon),
      ]);

      setWeatherData(current);
      setForecastData(forecast);
      setSelectedDate(buildDayOptions(forecast)[0]?.date ?? "");
      setViewState("ready");
    } catch (error) {
      console.error(error);
      setWeatherData(null);
      setForecastData(null);
      setViewState("no-results");
    }
  }

  async function handleSearch() {
    const trimmed = query.trim();
    if (!trimmed) return;

    setViewState("loading");
    setSuggestions([]);

    try {
      const locations = await searchLocations(trimmed);

      if (locations.length === 0) {
        setWeatherData(null);
        setForecastData(null);
        setViewState("no-results");
        return;
      }

      await loadWeatherForLocation(locations[0]);
    } catch (error) {
      console.error(error);
      setWeatherData(null);
      setForecastData(null);
      setViewState("no-results");
    }
  }

  useEffect(() => {
    async function loadDefault() {
      try {
        const locations = await searchLocations("Berlin");
        if (locations[0]) {
          await loadWeatherForLocation(locations[0]);
        } else {
          setViewState("no-results");
        }
      } catch (error) {
        console.error(error);
        setViewState("no-results");
      }
    }

    loadDefault();
  }, []);

  useEffect(() => {
    if (skipSuggestRef.current) {
      skipSuggestRef.current = false;
      setSuggestions([]);
      return;
    }

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const results = await searchLocations(trimmed);
        setSuggestions(results);
      } catch (error) {
        console.error(error);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const isLoading = viewState === "loading";
  const showWeather = viewState === "loading" || viewState === "ready";

  const dailyForecast = forecastData
    ? buildDailyForecast(forecastData).map((day) => ({
        ...day,
        high: convertTemperature(day.high, units.temperature),
        low: convertTemperature(day.low, units.temperature),
      }))
    : [];

  const dayOptions = forecastData ? buildDayOptions(forecastData) : [];

  const hourlyForecast =
    forecastData && selectedDate
      ? buildHourlyForecast(forecastData, selectedDate).map((hour) => ({
          ...hour,
          temperature: convertTemperature(hour.temperature, units.temperature),
        }))
      : [];

  const currentTemp =
    weatherData?.main.temp !== undefined
      ? convertTemperature(weatherData.main.temp, units.temperature)
      : undefined;

  const feelsLike =
    weatherData?.main.feels_like !== undefined
      ? convertTemperature(weatherData.main.feels_like, units.temperature)
      : undefined;

  const windSpeed =
    weatherData?.wind.speed !== undefined
      ? convertWind(weatherData.wind.speed, units.wind)
      : undefined;

  const precipitationMm =
    weatherData?.rain?.["1h"] ??
    weatherData?.rain?.["3h"] ??
    weatherData?.snow?.["1h"] ??
    weatherData?.snow?.["3h"] ??
    0;

  const precipitation = convertPrecipitation(precipitationMm, units.precipitation);

  return (
    <div className="min-h-screen w-full bg-[#02012b] text-white">
      <Navbar units={units} onChangeUnits={setUnits} />
      <Hero
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        suggestions={suggestions}
        onSelectSuggestion={loadWeatherForLocation}
        showNoResults={viewState === "no-results"}
      />

      {showWeather && (
        <div className="mx-4 mt-8 mb-10 flex flex-col gap-5 sm:mx-6 md:mx-10 md:mb-15 lg:mx-30 lg:mt-15 lg:mb-20 lg:flex-row lg:items-stretch">
          <div className="w-full lg:w-2/3">
            <MainCard
              location={
                weatherData
                  ? formatLocation(weatherData.name, weatherData.sys.country)
                  : undefined
              }
              temperature={currentTemp}
              icon={weatherData?.weather[0]?.main}
              isLoading={isLoading}
            />
            <Info
              feels={
                isLoading || feelsLike === undefined ? "—" : `${feelsLike}°`
              }
              humidity={
                isLoading || weatherData?.main.humidity === undefined
                  ? "—"
                  : `${weatherData.main.humidity}%`
              }
              wind={
                isLoading || windSpeed === undefined
                  ? "—"
                  : `${windSpeed} ${windLabel(units.wind)}`
              }
              precipitation={
                isLoading
                  ? "—"
                  : `${precipitation} ${precipitationLabel(units.precipitation)}`
              }
            />
            <Daily days={dailyForecast} isLoading={isLoading} />
          </div>
          <div className="flex w-full lg:w-1/3">
            <Hourly
              hours={hourlyForecast}
              days={dayOptions}
              selectedDate={selectedDate}
              onSelectDay={setSelectedDate}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App

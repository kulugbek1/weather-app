import type {
  PrecipitationUnit,
  TemperatureUnit,
  UnitsPreferences,
  WindUnit,
} from "../types/weather.types";

export const defaultUnits: UnitsPreferences = {
  temperature: "celsius",
  wind: "kmh",
  precipitation: "mm",
};

export const metricUnits: UnitsPreferences = {
  temperature: "celsius",
  wind: "kmh",
  precipitation: "mm",
};

export const imperialUnits: UnitsPreferences = {
  temperature: "fahrenheit",
  wind: "mph",
  precipitation: "in",
};

export function isMetric(units: UnitsPreferences) {
  return (
    units.temperature === "celsius" &&
    units.wind === "kmh" &&
    units.precipitation === "mm"
  );
}

/** API metric temps are Celsius */
export function convertTemperature(celsius: number, unit: TemperatureUnit) {
  if (unit === "fahrenheit") {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

/** API metric wind is m/s */
export function convertWind(metersPerSecond: number, unit: WindUnit) {
  if (unit === "mph") {
    return Math.round(metersPerSecond * 2.23694);
  }
  return Math.round(metersPerSecond * 3.6);
}

export function convertPrecipitation(mm: number, unit: PrecipitationUnit) {
  if (unit === "in") {
    return Number((mm / 25.4).toFixed(2));
  }
  return Math.round(mm);
}

export function windLabel(unit: WindUnit) {
  return unit === "mph" ? "mph" : "km/h";
}

export function precipitationLabel(unit: PrecipitationUnit) {
  return unit === "in" ? "in" : "mm";
}

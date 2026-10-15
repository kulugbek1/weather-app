import type {
  DailyForecast,
  DayOption,
  ForecastData,
  ForecastListItem,
  HourlyForecast,
  WeatherCondition,
} from "../types/weather.types";

function getLocalDate(dt: number, timezoneOffset: number) {
  return new Date((dt + timezoneOffset) * 1000);
}

function toDateKey(dt: number, timezoneOffset: number) {
  return getLocalDate(dt, timezoneOffset).toISOString().slice(0, 10);
}

function formatWeekday(
  dt: number,
  timezoneOffset: number,
  style: "short" | "long"
) {
  return getLocalDate(dt, timezoneOffset).toLocaleDateString("en-US", {
    weekday: style,
    timeZone: "UTC",
  });
}

function formatHour(dt: number, timezoneOffset: number) {
  return getLocalDate(dt, timezoneOffset).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
    timeZone: "UTC",
  });
}

function mostCommonCondition(items: ForecastListItem[]): WeatherCondition {
  const counts = new Map<WeatherCondition, number>();

  for (const item of items) {
    const condition = item.weather[0]?.main ?? "Clear";
    counts.set(condition, (counts.get(condition) ?? 0) + 1);
  }

  let best: WeatherCondition = "Clear";
  let bestCount = 0;

  for (const [condition, count] of counts) {
    if (count > bestCount) {
      best = condition;
      bestCount = count;
    }
  }

  return best;
}

export function buildDailyForecast(forecast: ForecastData): DailyForecast[] {
  const groups = new Map<string, ForecastListItem[]>();

  for (const item of forecast.list) {
    const key = toDateKey(item.dt, forecast.city.timezone);
    const group = groups.get(key) ?? [];
    group.push(item);
    groups.set(key, group);
  }

  return [...groups.entries()].map(([date, items]) => {
    const highs = items.map((item) => item.main.temp_max);
    const lows = items.map((item) => item.main.temp_min);

    return {
      date,
      dayLabel: formatWeekday(items[0].dt, forecast.city.timezone, "short"),
      high: Math.round(Math.max(...highs)),
      low: Math.round(Math.min(...lows)),
      icon: mostCommonCondition(items),
    };
  });
}

export function buildDayOptions(forecast: ForecastData): DayOption[] {
  return buildDailyForecast(forecast).map((day) => ({
    date: day.date,
    label: formatWeekday(
      forecast.list.find(
        (item) => toDateKey(item.dt, forecast.city.timezone) === day.date
      )!.dt,
      forecast.city.timezone,
      "long"
    ),
  }));
}

export function buildHourlyForecast(
  forecast: ForecastData,
  selectedDate: string
): HourlyForecast[] {
  return forecast.list
    .filter(
      (item) => toDateKey(item.dt, forecast.city.timezone) === selectedDate
    )
    .map((item) => ({
      date: selectedDate,
      timeLabel: formatHour(item.dt, forecast.city.timezone),
      temperature: Math.round(item.main.temp),
      icon: item.weather[0]?.main ?? "Clear",
    }));
}

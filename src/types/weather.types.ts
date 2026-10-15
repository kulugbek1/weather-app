export type WeatherCondition =
  | "Thunderstorm"
  | "Drizzle"
  | "Rain"
  | "Snow"
  | "Atmosphere"
  | "Clear"
  | "Clouds";

export type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: WeatherCondition;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  snow?: {
    "1h"?: number;
    "3h"?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type GeoLocation = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

export type MainCardProps = {
  location?: string;
  temperature?: number;
  icon?: WeatherCondition;
  isLoading?: boolean;
};

export type InfoProps = {
  feels: string;
  humidity: string;
  wind: string;
  precipitation: string;
};

export type InfoItemsProps = {
  info: string;
  name: string;
};

export type ForecastListItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: WeatherCondition;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    "3h"?: number;
  };
  snow?: {
    "3h"?: number;
  };
  visibility: number;
  pop: number;
  dt_txt: string;
};

export type ForecastData = {
  list: ForecastListItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export type DailyForecast = {
  date: string;
  dayLabel: string;
  high: number;
  low: number;
  icon: WeatherCondition;
};

export type HourlyForecast = {
  date: string;
  timeLabel: string;
  temperature: number;
  icon: WeatherCondition;
};

export type DayOption = {
  date: string;
  label: string;
};

export type DailyItemsProps = {
  dayLabel: string;
  high: number;
  low: number;
  icon: WeatherCondition;
};

export type DailyProps = {
  days: DailyForecast[];
  isLoading?: boolean;
};

export type HourlyItemsProps = {
  timeLabel: string;
  temperature: number;
  icon: WeatherCondition;
};

export type HourlyProps = {
  hours: HourlyForecast[];
  days: DayOption[];
  selectedDate: string;
  onSelectDay: (date: string) => void;
  isLoading?: boolean;
};

export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "in";

export type UnitsPreferences = {
  temperature: TemperatureUnit;
  wind: WindUnit;
  precipitation: PrecipitationUnit;
};

export type NavbarProps = {
  units: UnitsPreferences;
  onChangeUnits: (units: UnitsPreferences) => void;
};

export type HeroProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  suggestions: GeoLocation[];
  onSelectSuggestion: (location: GeoLocation) => void;
  showNoResults?: boolean;
};

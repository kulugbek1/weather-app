import drizzle from "../assets/images/icon-drizzle.webp";
import fog from "../assets/images/icon-fog.webp";
import overcast from "../assets/images/icon-overcast.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import storm from "../assets/images/icon-storm.webp";
import sunny from "../assets/images/icon-sunny.webp";

export const weatherIcons = {
  Thunderstorm: storm,
  Drizzle: drizzle,
  Rain: rain,
  Snow: snow,
  Atmosphere: fog,
  Clear: sunny,
  Clouds: overcast,
} as const;

import bgLarge from "../assets/images/bg-today-large.svg";
import bgSmall from "../assets/images/bg-today-small.svg";
import { weatherIcons } from "../constants/weatherIcons";
import { useState, useEffect } from "react";
import type { MainCardProps } from "../types/weather.types";

export const MainCard = ({ location, temperature, icon, isLoading }: MainCardProps) => {
  const [dateState, setDateState] = useState(new Date());
  const weatherIcon = weatherIcons[icon ?? "Clear"];

  useEffect(() => {
    const timer = setInterval(() => setDateState(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="mb-5 flex h-70 w-full items-center justify-center rounded-2xl bg-[#25253f] sm:h-80 md:h-103">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-white [animation-delay:-0.2s]" />
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-white [animation-delay:-0.1s]" />
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-white" />
          </div>
          <p className="font-dm-sans text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-5 w-full overflow-hidden rounded-2xl">
      <img
        src={bgSmall}
        alt=""
        className="absolute inset-0 h-full w-full object-cover md:hidden"
        aria-hidden="true"
      />
      <img
        src={bgLarge}
        alt=""
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-70 flex-col items-center justify-between gap-6 px-6 py-10 sm:min-h-80 sm:px-8 md:h-103 md:min-h-0 md:flex-row md:items-center md:gap-0 md:px-10 md:py-0">
        <div className="text-center md:text-left">
          <h2 className="pb-2 text-3xl font-dm-sans font-semibold sm:text-4xl md:text-5xl">
            {location}
          </h2>
          <p className="text-base font-dm-sans font-medium opacity-70 sm:text-lg md:text-xl">
            {dateState.toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center">
          <img
            src={weatherIcon}
            alt="weather"
            className="h-28 w-28 sm:h-36 sm:w-36 md:h-50 md:w-50"
          />
          <p className="text-7xl font-dm-sans font-semibold italic sm:text-8xl md:text-[120px]">
            {temperature}°
          </p>
        </div>
      </div>
    </div>
  );
};

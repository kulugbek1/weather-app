import { weatherIcons } from "../constants/weatherIcons"
import type { HourlyItemsProps } from "../types/weather.types"

export const HourlyItems = ({ timeLabel, temperature, icon }: HourlyItemsProps) => {
  return (
    <div className="flex h-9 w-full items-center justify-between rounded-xl bg-[#2f2f49] px-3 sm:h-21 sm:px-4">
      <div className="flex items-center gap-1">
        <img
          src={weatherIcons[icon]}
          alt={icon}
          className="h-8 w-8 sm:h-20 sm:w-20"
        />
        <p className="font-dm-sans font-medium text-sm sm:text-xl">{timeLabel}</p>
      </div>
      <p className="font-dm-sans font-medium text-sm sm:text-xl">{temperature}°</p>
    </div>
  )
}

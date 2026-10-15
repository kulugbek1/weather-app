import { weatherIcons } from "../constants/weatherIcons"
import type { DailyItemsProps } from "../types/weather.types"

export const DailyItems = ({ dayLabel, high, low, icon }: DailyItemsProps) => {
  return (
    <div className="flex h-40 w-26 shrink-0 flex-col items-center justify-between rounded-2xl bg-[#25253f] p-4 sm:h-auto sm:min-h-44 sm:w-auto sm:p-5">
      <h2 className="font-dm-sans font-bold">{dayLabel}</h2>
      <img
        src={weatherIcons[icon]}
        alt={icon}
        className="h-16 w-16 sm:h-20 sm:w-20 md:h-25 md:w-25"
      />
      <div className="flex w-full justify-between gap-2">
        <p className="font-dm-sans font-medium">{high}°</p>
        <p className="font-dm-sans font-medium opacity-70">{low}°</p>
      </div>
    </div>
  )
}

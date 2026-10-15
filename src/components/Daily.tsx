import { DailyItems } from "./DailyItems"
import type { DailyProps } from "../types/weather.types"

const SKELETON_SLOTS = 7

export const Daily = ({ days, isLoading }: DailyProps) => {
  return (
    <div className="w-full pb-10 md:pb-15">
      <h3 className="mb-5 text-xl font-dm-sans font-bold">Daily forecast</h3>
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 md:grid-cols-6 md:pb-0">
        {isLoading
          ? Array.from({ length: SKELETON_SLOTS }).map((_, index) => (
              <div
                key={index}
                className="h-40 w-26 shrink-0 rounded-2xl bg-[#25253f] sm:h-auto sm:min-h-44 sm:w-auto"
              />
            ))
          : days.map((day) => (
              <DailyItems
                key={day.date}
                dayLabel={day.dayLabel}
                high={day.high}
                low={day.low}
                icon={day.icon}
              />
            ))}
      </div>
    </div>
  )
}

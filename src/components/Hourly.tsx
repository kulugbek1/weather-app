import { useEffect, useRef, useState } from "react"
import { HourlyItems } from "./HourlyItems"
import dropdown from "../assets/images/icon-dropdown.svg"
import type { HourlyProps } from "../types/weather.types"

const SKELETON_SLOTS = 8

export const Hourly = ({
  hours,
  days,
  selectedDate,
  onSelectDay,
  isLoading,
}: HourlyProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const selectedLabel =
    days.find((day) => day.date === selectedDate)?.label ?? "—"

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-[#25253f] p-5 sm:p-6 md:p-7 lg:min-h-232">
      <div className="relative mb-8 flex items-center justify-between gap-3" ref={menuRef}>
        <h3 className="text-xl sm:text-2xl">Hourly forecast</h3>
        <button
          type="button"
          onClick={() => !isLoading && days.length > 0 && setIsOpen((open) => !open)}
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-md bg-[#3d3a5f] px-4 py-2.5 sm:gap-3 sm:px-6 sm:py-3"
        >
          <span className="font-dm-sans font-medium text-sm sm:text-base">
            {isLoading ? "—" : selectedLabel}
          </span>
          <img src={dropdown} alt="" width={13} height={13} />
        </button>

        {isOpen && (
          <div className="absolute top-14 right-0 z-20 min-w-40 overflow-hidden rounded-md bg-[#3d3a5f] shadow-lg">
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                onClick={() => {
                  onSelectDay(day.date)
                  setIsOpen(false)
                }}
                className={`block w-full cursor-pointer px-4 py-2.5 text-left font-dm-sans text-sm hover:bg-[#2f2f49] sm:text-base ${
                  day.date === selectedDate ? "bg-[#2f2f49]" : ""
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
        {isLoading
          ? Array.from({ length: SKELETON_SLOTS }).map((_, index) => (
              <div
                key={index}
                className="h-9 w-full rounded-xl bg-[#2f2f49] sm:h-21"
              />
            ))
          : hours.map((hour) => (
              <HourlyItems
                key={`${hour.date}-${hour.timeLabel}`}
                timeLabel={hour.timeLabel}
                temperature={hour.temperature}
                icon={hour.icon}
              />
            ))}
      </div>
    </div>
  )
}

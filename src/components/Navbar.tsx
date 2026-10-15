import { useEffect, useRef, useState } from "react"
import logo from "../assets/images/logo.svg"
import unitsIcon from "../assets/images/icon-units.svg"
import dropdown from "../assets/images/icon-dropdown.svg"
import checkmark from "../assets/images/icon-checkmark.svg"
import type { NavbarProps, UnitsPreferences } from "../types/weather.types"
import { imperialUnits, isMetric, metricUnits } from "../utils/units"

type OptionButtonProps = {
  label: string
  selected: boolean
  onClick: () => void
}

function OptionButton({ label, selected, onClick }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left font-dm-sans text-sm ${
        selected ? "bg-[#302f4a]" : "hover:bg-[#302f4a]/40"
      }`}
    >
      <span>{label}</span>
      {selected && <img src={checkmark} alt="" width={14} height={14} />}
    </button>
  )
}

export const Navbar = ({ units, onChangeUnits }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function updateUnits(partial: Partial<UnitsPreferences>) {
    onChangeUnits({ ...units, ...partial })
  }

  return (
    <div className="mx-4 flex items-center justify-between py-8 sm:mx-6 md:mx-10 md:py-12 lg:mx-30 lg:py-15">
      <img src={logo} alt="Logo" className="h-7 w-auto sm:h-10" />

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex cursor-pointer items-center gap-2 rounded-md bg-[#25253f] px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <img src={unitsIcon} alt="" width={16} height={16} />
          <p className="font-dm-sans text-sm font-medium sm:text-base">Units</p>
          <img
            src={dropdown}
            alt=""
            width={16}
            height={16}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-14 right-0 z-30 w-54 rounded-xl border border-[#3c3b5f] bg-[#262540] p-2 shadow-xl sm:w-60">
            <button
              type="button"
              onClick={() =>
                onChangeUnits(isMetric(units) ? imperialUnits : metricUnits)
              }
              className="mb-2 w-full cursor-pointer rounded-lg px-3 py-2.5 text-left font-dm-sans text-sm font-medium hover:bg-[#302f4a]"
            >
              {isMetric(units) ? "Switch to Imperial" : "Switch to Metric"}
            </button>

            <div className="px-3 pb-2 pt-1">
              <p className="mb-1 font-dm-sans text-xs text-white/50">Temperature</p>
              <OptionButton
                label="Celsius (°C)"
                selected={units.temperature === "celsius"}
                onClick={() => updateUnits({ temperature: "celsius" })}
              />
              <OptionButton
                label="Fahrenheit (°F)"
                selected={units.temperature === "fahrenheit"}
                onClick={() => updateUnits({ temperature: "fahrenheit" })}
              />
            </div>

            <div className="px-3 pb-2 pt-1">
              <p className="mb-1 font-dm-sans text-xs text-white/50">Wind Speed</p>
              <OptionButton
                label="km/h"
                selected={units.wind === "kmh"}
                onClick={() => updateUnits({ wind: "kmh" })}
              />
              <OptionButton
                label="mph"
                selected={units.wind === "mph"}
                onClick={() => updateUnits({ wind: "mph" })}
              />
            </div>

            <div className="px-3 pb-1 pt-1">
              <p className="mb-1 font-dm-sans text-xs text-white/50">Precipitation</p>
              <OptionButton
                label="Millimeters (mm)"
                selected={units.precipitation === "mm"}
                onClick={() => updateUnits({ precipitation: "mm" })}
              />
              <OptionButton
                label="Inches (in)"
                selected={units.precipitation === "in"}
                onClick={() => updateUnits({ precipitation: "in" })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

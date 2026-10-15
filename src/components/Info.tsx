import { InfoItems } from "./InfoItems"
import type { InfoProps } from "../types/weather.types"

export const Info = ({ feels, humidity, wind, precipitation }: InfoProps) => {
  return (
    <div className="mb-10 grid w-full grid-cols-2 gap-4 sm:gap-4 md:mb-15 lg:grid-cols-4 lg:items-stretch">
      <InfoItems info={feels} name="Feels Like" />
      <InfoItems info={humidity} name="Humidity" />
      <InfoItems info={wind} name="Wind" />
      <InfoItems info={precipitation} name="Precipitation" />
    </div>
  )
}

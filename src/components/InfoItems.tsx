import type { InfoItemsProps } from "../types/weather.types"

export const InfoItems = ({ info, name }: InfoItemsProps) => {
  return (
    <div className="flex min-h-28 w-full flex-col justify-between rounded-2xl bg-[#25253f] p-5 sm:min-h-36 sm:rounded-3xl sm:p-6 md:min-h-50 md:p-8">
      <h3 className="text-lg font-dm-sans font-medium sm:text-xl md:text-2xl">{name}</h3>
      <h1 className="text-3xl font-dm-sans font-medium sm:text-4xl md:text-4xl">{info}</h1>
    </div>
  )
}

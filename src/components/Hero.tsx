import search from "../assets/images/icon-search.svg"
import type { HeroProps } from "../types/weather.types"
import { formatSuggestion } from "../utils/location"

export const Hero = ({
  query,
  onQueryChange,
  onSearch,
  suggestions,
  onSelectSuggestion,
  showNoResults = false,
}: HeroProps) => {
  return (
    <div className="flex flex-col items-center px-4 sm:px-6">
      <h1 className="mb-8 max-w-3xl text-center text-3xl font-bricolage-grotesque font-bold sm:mb-12 sm:text-5xl md:mb-16 md:text-6xl">
        How's the sky looking today?
      </h1>

      <div className="relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl">
        <form
          className="flex w-full flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault()
            onSearch()
          }}
        >
          <span className="relative w-full flex-1">
            <img className="pointer-events-none absolute top-3.5 left-4" src={search} alt="" />
            <input
              type="text"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              className="w-full rounded-xl bg-[#25253f] p-3.5 pl-14 font-dm-sans font-medium outline-none transition ring-0 focus:ring-2 focus:ring-[#4657d9]"
              placeholder="Search for a place..."
              autoComplete="off"
            />
          </span>
          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-[#4657d9] px-6 py-3.5 font-dm-sans font-medium transition hover:bg-[#5b6be3] sm:min-w-28"
          >
            Search
          </button>
        </form>

        {suggestions.length > 0 && (
          <div className="absolute top-full z-30 mt-2 w-full overflow-hidden rounded-xl bg-[#25253f] p-2 shadow-xl sm:max-w-[calc(100%-7.5rem)]">
            {suggestions.map((location) => (
              <button
                key={`${location.name}-${location.lat}-${location.lon}`}
                type="button"
                onClick={() => onSelectSuggestion(location)}
                className="block w-full cursor-pointer rounded-lg px-4 py-3 text-left font-dm-sans text-sm font-medium transition hover:bg-[#302f4a] sm:text-base"
              >
                {formatSuggestion(location)}
              </button>
            ))}
          </div>
        )}
      </div>

      {showNoResults && (
        <p className="mt-10 text-center font-dm-sans text-lg font-medium sm:text-xl">
          No search result found!
        </p>
      )}
    </div>
  )
}

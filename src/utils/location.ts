const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export function formatLocation(city: string, countryCode?: string) {
  if (!countryCode) return city;
  const country = regionNames.of(countryCode) ?? countryCode;
  return `${city}, ${country}`;
}

export function formatSuggestion(location: {
  name: string;
  state?: string;
  country: string;
}) {
  const country = regionNames.of(location.country) ?? location.country;
  return [location.name, location.state, country].filter(Boolean).join(", ");
}

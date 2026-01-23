
import { City, Country, State } from 'country-state-city';
import { WORLD_CITIES } from "./cities";

export async function getCoordinates(cityString: string): Promise<{ lat: number; lng: number } | null> {
  // If it's a "City, State, Country" or "City, Country" format
  if (cityString.includes(',')) {
    const parts = cityString.split(',').map(s => s.trim());
    const cityName = parts[0];
    const countryName = parts[parts.length - 1];
    const stateName = parts.length > 2 ? parts[1] : null;
    
    // Find country code first for faster search
    const countries = Country.getAllCountries();
    const country = countries.find(c => 
      c.name.toLowerCase() === countryName.toLowerCase() || 
      c.isoCode.toLowerCase() === countryName.toLowerCase()
    );
    
    if (country) {
      let cities: any[] = [];
      if (stateName) {
        const states = State.getStatesOfCountry(country.isoCode);
        const state = states.find(s => s.name.toLowerCase() === stateName.toLowerCase());
        if (state) {
          cities = City.getCitiesOfState(country.isoCode, state.isoCode);
        }
      }
      
      // Fallback to country-wide search if state search yielded nothing
      if (cities.length === 0) {
        cities = City.getCitiesOfCountry(country.isoCode);
      }
      
      const found = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
      
      if (found && found.latitude && found.longitude) {
        return { 
          lat: parseFloat(found.latitude), 
          lng: parseFloat(found.longitude) 
        };
      }
    } else {
      // Fallback: search all cities if country not found or format mismatch
      const allCities = City.getAllCities();
      const found = allCities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
      if (found && found.latitude && found.longitude) {
        return { 
          lat: parseFloat(found.latitude), 
          lng: parseFloat(found.longitude) 
        };
      }
    }
  }

  // Fallback to local static list
  const found = WORLD_CITIES.find(c => c.name.toLowerCase() === cityString.toLowerCase());
  if (found) {
    return { lat: found.lat, lng: found.lng };
  }
  
  // Default to Istanbul if not found
  return { lat: 41.0082, lng: 28.9784 };
}

"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Search, ArrowLeft, Globe, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

const fixName = (name: string) => {
  return name.replace(/\bTurkey\b/g, "Türkiye");
};

export interface CitySelectData {
  name: string;
  latitude: number;
  longitude: number;
}

interface CitySelectorProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (data: CitySelectData) => void;
  onSearchStateChange?: (active: boolean) => void;
  placeholder?: string;
}

export function CitySelector({ 
  value, 
  onChange, 
  onSelect, 
  onSearchStateChange,
  placeholder = "Doğum yeri seçin...",
  direction = "down"
}: CitySelectorProps & { direction?: "up" | "down" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onSearchStateChange?.(open);
  }, [open, onSearchStateChange]);
  
  const [step, setStep] = useState<"search" | "state" | "city">("search");
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [selectedState, setSelectedState] = useState<IState | null>(null);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState(value);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;
      const dropdown = document.getElementById('city-selector-dropdown');
      if (
        containerRef.current && 
        !containerRef.current.contains(target) &&
        (!dropdown || !dropdown.contains(target))
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [open]);

  const handleFocus = () => {
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (step !== "search") resetSelector();
    
    if (newValue.length >= 2) {
      setSearch(newValue);
      setSearchTriggered(true);
      setOpen(true);
    } else {
      setSearchTriggered(false);
      setOpen(false);
    }
  };

  const countries = useMemo(() => Country.getAllCountries().map(c => ({ ...c, name: fixName(c.name) })), []);
  const allStates = useMemo(() => State.getAllStates().map(s => ({ ...s, name: fixName(s.name) })), []);
  const allCities = useMemo(() => City.getAllCities().map(c => ({ ...c, name: fixName(c.name) })), []);

  const searchResults = useMemo(() => {
    if (step !== "search") return { countries: [], states: [], cities: [] };
    if (!searchTriggered || !search || search.length < 2) return { countries: [], states: [], cities: [] };

    const searchLower = search.toLowerCase();

    const filteredCountries = countries.filter((c) =>
      c.name.toLowerCase().includes(searchLower)
    ).slice(0, 3);

    const filteredStates = allStates.filter((s) =>
      s.name.toLowerCase().includes(searchLower)
    ).slice(0, 5);

    const filteredCities = allCities.filter((c) =>
      c.name.toLowerCase().includes(searchLower)
    ).slice(0, 20);

    return { countries: filteredCountries, states: filteredStates, cities: filteredCities };
  }, [countries, allStates, allCities, search, step, searchTriggered]);

  const statesOfSelectedCountry = useMemo(() => {
    if (step !== "state" || !selectedCountry) return [];
    return State.getStatesOfCountry(selectedCountry.isoCode).map(s => ({ ...s, name: fixName(s.name) })).sort((a, b) => a.name.localeCompare(b.name)) || [];
  }, [selectedCountry, step]);

  const citiesOfSelectedState = useMemo(() => {
    if (step !== "city" || !selectedCountry || !selectedState) return [];
    return City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode).map(c => ({ ...c, name: fixName(c.name) })).sort((a, b) => a.name.localeCompare(b.name)) || [];
  }, [selectedCountry, selectedState, step]);

  const handleCountrySelect = (country: ICountry) => {
    setSelectedCountry(country);
    setStep("state");
    setSearch("");
  };

  const handleStateSelect = (state: IState) => {
    const country = countries.find(c => c.isoCode === state.countryCode);
    if (country) {
      setSelectedCountry(country);
      setSelectedState(state);
      const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
      if (cities && cities.length > 0) {
        setStep("city");
      } else {
        finalizeSelection(`${state.name}, ${country.name}`);
      }
    }
    setSearch("");
  };

  const handleCitySelect = (city: ICity) => {
    const state = allStates.find(s => s.isoCode === city.stateCode && s.countryCode === city.countryCode);
    const country = countries.find(c => c.isoCode === city.countryCode);

    if (onSelect && city.latitude && city.longitude) {
      onSelect({
        name: city.name,
        latitude: parseFloat(city.latitude),
        longitude: parseFloat(city.longitude)
      });
    }

    if (state && country) {
      finalizeSelection(`${city.name}, ${state.name}, ${country.name}`);
    } else if (selectedCountry && selectedState) {
      finalizeSelection(`${city.name}, ${selectedState.name}, ${selectedCountry.name}`);
    }
  };

  const finalizeSelection = (locationString: string) => {
    onChange(locationString);
    setOpen(false);
    setTimeout(() => {
      resetSelector();
    }, 300);
  };

  const resetSelector = () => {
    setStep("search");
    setSelectedCountry(null);
    setSelectedState(null);
    setSearch("");
    setSearchTriggered(false);
  };

  const handleBack = () => {
    if (step === "city") {
      setStep("state");
      setSelectedState(null);
    } else if (step === "state") {
      setStep("search");
      setSelectedCountry(null);
    }
    setSearch("");
  };

  const renderResultItem = (
    key: string,
    icon: React.ReactNode,
    label: string,
    sublabel?: string,
    onClick?: () => void
  ) => (
    <button
      key={key}
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 text-left text-mystic-gold hover:bg-mystic-gold/10 active:bg-mystic-gold/20 transition-colors cursor-pointer"
      style={{ minHeight: '52px' }}
    >
      <span className="flex-shrink-0 text-mystic-gold/50">{icon}</span>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-sm truncate">{label}</span>
        {sublabel && <span className="text-xs text-mystic-gold/50 truncate">{sublabel}</span>}
      </div>
    </button>
  );

  const allResults = [
    ...searchResults.countries.map(c => ({ type: 'country' as const, data: c })),
    ...searchResults.states.map(s => ({ type: 'state' as const, data: s })),
    ...searchResults.cities.map(c => ({ type: 'city' as const, data: c })),
  ];

  const dropdownContent = (
    <AnimatePresence>
      {open && (
        <motion.div
          id="city-selector-dropdown"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.15 }}
          className={`absolute left-0 right-0 ${direction === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'} bg-[#111111] border border-[#444] rounded-xl shadow-2xl overflow-y-auto`}
          style={{
            minHeight: '200px',
            maxHeight: '250px',
            WebkitOverflowScrolling: 'touch',
            zIndex: 50,
          }}
        >
          {step !== "search" && (
            <div className="flex items-center border-b border-mystic-gold/10 px-3 py-2 sticky top-0 bg-[#111111] z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="h-8 w-8 text-mystic-gold hover:bg-white/10 mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs text-mystic-gold uppercase tracking-widest font-mystic">
                {step === "state" ? "Şehir Seç" : "İlçe Seç"}
              </span>
            </div>
          )}

          {step === "search" && (
            <>
              {!searchTriggered ? (
                  <div className="py-8 text-center text-sm text-mystic-gold/50">
                    Aramak için en az 2 karakter yazın.
                  </div>
                ) : allResults.length === 0 ? (
                <div className="py-8 text-center text-sm text-mystic-gold/50">
                  Bulunamadı.
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {searchResults.countries.length > 0 && (
                    <div>
                      <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-mystic-gold/40 bg-[#0a0a0a] sticky top-0">
                        Ülkeler
                      </div>
                      {searchResults.countries.map((country) =>
                        renderResultItem(
                          country.isoCode,
                          <Globe className="h-4 w-4" />,
                          country.name,
                          undefined,
                          () => handleCountrySelect(country)
                        )
                      )}
                    </div>
                  )}
                  {searchResults.states.length > 0 && (
                    <div>
                      <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-mystic-gold/40 bg-[#0a0a0a] sticky top-0">
                        Şehirler
                      </div>
                      {searchResults.states.map((state) =>
                        renderResultItem(
                          `${state.countryCode}-${state.isoCode}`,
                          <MapPin className="h-4 w-4" />,
                          state.name,
                          countries.find(c => c.isoCode === state.countryCode)?.name,
                          () => handleStateSelect(state)
                        )
                      )}
                    </div>
                  )}
                  {searchResults.cities.length > 0 && (
                    <div>
                      <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-mystic-gold/40 bg-[#0a0a0a] sticky top-0">
                        İlçeler
                      </div>
                      {searchResults.cities.map((city) => {
                        const state = allStates.find(s => s.isoCode === city.stateCode && s.countryCode === city.countryCode);
                        const country = countries.find(c => c.isoCode === city.countryCode);
                        return renderResultItem(
                          `${city.countryCode}-${city.stateCode}-${city.name}-${city.latitude}`,
                          <MapPin className="h-4 w-4" />,
                          city.name,
                          `${state?.name || ''}, ${country?.name || ''}`,
                          () => handleCitySelect(city)
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {step === "state" && (
            <div>
              {statesOfSelectedCountry.length === 0 ? (
                <div className="py-8 text-center text-sm text-mystic-gold/50">
                  Bu ülkede şehir bulunamadı.
                </div>
              ) : (
                statesOfSelectedCountry.map((state) =>
                  renderResultItem(
                    state.isoCode,
                    <MapPin className="h-4 w-4" />,
                    state.name,
                    undefined,
                    () => handleStateSelect(state)
                  )
                )
              )}
            </div>
          )}

          {step === "city" && (
            <div>
              {citiesOfSelectedState.length === 0 ? (
                <div className="py-8 text-center text-sm text-mystic-gold/50">
                  Bu şehirde ilçe bulunamadı.
                </div>
              ) : (
                citiesOfSelectedState.map((city) =>
                  renderResultItem(
                    `${city.name}-${city.latitude}-${city.longitude}`,
                    <MapPin className="h-4 w-4" />,
                    city.name,
                    undefined,
                    () => handleCitySelect(city)
                  )
                )
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

    return (
      <div ref={containerRef} className="relative w-full">
        <div className="relative w-full">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder={placeholder}
            className="w-full bg-white/10 border-2 border-mystic-gold/40 text-white placeholder:text-white/40 h-14 rounded-xl text-left font-normal focus-visible:ring-2 focus-visible:ring-mystic-gold/60 pr-12 text-base"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search className="h-5 w-5 text-mystic-gold/50" />
          </div>
        </div>

        {dropdownContent}
      </div>
    );
}

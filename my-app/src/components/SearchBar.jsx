import { useMemo, useState } from 'react'

export default function SearchBar({ value, onChange, suggestions = [], onSelectSuggestion }) {
  const [isFocused, setIsFocused] = useState(false)

  const visibleSuggestions = useMemo(() => {
    const query = value.trim().toLowerCase()

    if (!query) {
      return suggestions.slice(0, 8)
    }

    return suggestions.filter((suggestion) => suggestion.toLowerCase().includes(query)).slice(0, 8)
  }, [value, suggestions])

  return (
    <div className="relative flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 sm:flex-row sm:items-center sm:p-4">
      <div className="flex-1">
        <label htmlFor="pokemon-search" className="mb-1 block text-sm font-semibold text-slate-700">
          Buscar Pokémon
        </label>
        <input
          id="pokemon-search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          placeholder="Escribe un nombre..."
          aria-label="buscar Pokémon"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
        />

        {isFocused && visibleSuggestions.length > 0 && (
          <ul className="absolute z-20 mt-2 max-h-48 w-[calc(100%-2rem)] overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg sm:w-[calc(100%-1rem)]">
            {visibleSuggestions.map((suggestion) => (
              <li key={suggestion}>
                <button
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault()
                    onSelectSuggestion(suggestion)
                  }}
                  className="flex w-full items-center px-3 py-2 text-left text-sm capitalize text-slate-700 hover:bg-slate-50"
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={() => onSelectSuggestion(value.trim())}
        className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
      >
        Buscar
      </button>
    </div>
  )
}

import { useMemo, useState } from 'react'
import PokemonCard from './PokemonCard'

export default function PokemonList({
  pokemons = [],
  favorites = [],
  blocked = [],
  onToggleFavorite,
  onToggleBlocked,
  onRefresh,
  pokemonTypes = [],
  selectedTypeFilters = [],
  onTypeFilterChange,
}) {
  const [searchText, setSearchText] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const visibleTypes = useMemo(() => {
    return pokemonTypes.filter((type) => type.toLowerCase().includes(searchText.toLowerCase()))
  }, [pokemonTypes, searchText])

  const toggleType = (type) => {
    if (selectedTypeFilters.includes(type)) {
      onTypeFilterChange(selectedTypeFilters.filter((item) => item !== type))
    } else {
      onTypeFilterChange([...selectedTypeFilters, type])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Pokémon disponibles</h2>
          <p className="text-sm text-slate-500">Explora la colección cargada desde la API.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[220px]">
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-left text-sm text-slate-700 shadow-sm"
            >
              {selectedTypeFilters.length > 0 ? selectedTypeFilters.join(', ') : 'Filtrar por tipo'}
            </button>

            {isOpen && (
              <div className="absolute z-10 mt-2 w-full rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                <input
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="Buscar tipo..."
                  className="mb-2 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm outline-none focus:border-red-400"
                />

                <div className="max-h-44 space-y-1 overflow-y-auto">
                  {visibleTypes.map((type) => (
                    <label key={type} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={selectedTypeFilters.includes(type)}
                        onChange={() => toggleType(type)}
                        className="h-4 w-4 rounded border-slate-300 text-red-500 focus:ring-red-400"
                      />
                      <span className="capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onRefresh}
            className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Nuevos Pokémon
          </button>
          <span className="inline-flex w-fit rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
            {pokemons.length} resultados
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={favorites.some((favorite) => favorite.id === pokemon.id)}
            isBlocked={blocked.some((item) => item.id === pokemon.id)}
            onToggleFavorite={onToggleFavorite}
            onToggleBlocked={onToggleBlocked}
          />
        ))}
      </div>
    </div>
  )
}

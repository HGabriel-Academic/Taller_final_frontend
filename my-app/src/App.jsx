import { useEffect, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import StatsPanel from './components/StatsPanel'
import PokemonList from './components/PokemonList'
import FavoritesPanel from './components/FavoritesPanel'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [pokemons, setPokemons] = useState([])
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const [blocked, setBlocked] = useLocalStorage('blocked', [])
  const [blockedTypes, setBlockedTypes] = useLocalStorage('blockedTypes', [])
  const [pokemonTypes, setPokemonTypes] = useState([])
  const [pokemonNames, setPokemonNames] = useState([])
  const [selectedTypeFilters, setSelectedTypeFilters] = useState([])
  const [selectedBlockedType, setSelectedBlockedType] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPokemons = async (count = 12, typeFilters = selectedTypeFilters, favoritesList = favorites, blockedList = blocked, blockedTypeList = blockedTypes) => {
    setLoading(true)
    setError('')

    try {
      let pool = []

      if (typeFilters.length > 0) {
        const typeResponses = await Promise.all(
          typeFilters.map((typeFilter) => fetch(`https://pokeapi.co/api/v2/type/${typeFilter}`))
        )

        const typeData = await Promise.all(typeResponses.map((response) => response.json()))
        pool = typeData.flatMap((data) => data.pokemon.map((entry) => entry.pokemon))
      } else {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')

        if (!response.ok) {
          throw new Error('No se pudieron cargar los Pokémon')
        }

        const data = await response.json()
        pool = data.results
      }

      const shuffled = [...pool].sort(() => Math.random() - 0.5)
      const selected = []
      const seenIds = new Set()

      for (const entry of shuffled) {
        if (selected.length >= count) {
          break
        }

        const detailResponse = await fetch(entry.url)
        const detailData = await detailResponse.json()
        const isFavorite = favoritesList.some((fav) => fav.id === detailData.id)
        const isBlocked = blockedList.some((item) => item.id === detailData.id)
        const hasBlockedType = blockedTypeList.some((blockedType) =>
          detailData.types.some((typeItem) => typeItem.type.name === blockedType)
        )

        if (seenIds.has(detailData.id) || isFavorite || isBlocked || hasBlockedType) {
          continue
        }

        seenIds.add(detailData.id)
        selected.push({
          id: detailData.id,
          name: detailData.name,
          image: detailData.sprites.other['official-artwork'].front_default,
          types: detailData.types.map((typeItem) => typeItem.type.name),
          height: detailData.height,
          weight: detailData.weight,
          abilities: detailData.abilities.map((ability) => ability.ability.name),
          stats: detailData.stats.map((stat) => ({ name: stat.stat.name, value: stat.base_stat })),
          moves: detailData.moves.slice(0, 8).map((move) => move.move.name),
          detailUrl: detailData.species.url,
          speciesUrl: detailData.species.url,
          locationsUrl: detailData.location_area_encounters,
        })
      }

      setPokemons(selected)
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function loadMetadata() {
      try {
        const [typesResponse, namesResponse] = await Promise.all([
          fetch('https://pokeapi.co/api/v2/type'),
          fetch('https://pokeapi.co/api/v2/pokemon?limit=1000'),
        ])

        if (!typesResponse.ok || !namesResponse.ok) {
          throw new Error('No se pudieron cargar los metadatos')
        }

        const typesData = await typesResponse.json()
        const namesData = await namesResponse.json()

        setPokemonTypes(typesData.results.map((type) => type.name))
        setPokemonNames(namesData.results.map((pokemon) => pokemon.name))
      } catch (err) {
        console.error(err)
      }
    }

    loadMetadata()
  }, [])

  useEffect(() => {
    loadPokemons(12, selectedTypeFilters, favorites, blocked, blockedTypes)
  }, [favorites, blocked, blockedTypes, selectedTypeFilters])

  const filteredPokemon = pokemons.filter((pokemon) => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) return true

    return pokemon.name.toLowerCase().includes(query)
  })

  const toggleFavorite = (pokemon) => {
    setFavorites((currentFavorites) => {
      const isFavorite = currentFavorites.some((fav) => fav.id === pokemon.id)

      if (isFavorite) {
        return currentFavorites.filter((fav) => fav.id !== pokemon.id)
      }

      return [...currentFavorites, pokemon]
    })
  }

  const toggleBlocked = (pokemon) => {
    setBlocked((currentBlocked) => {
      const isBlocked = currentBlocked.some((item) => item.id === pokemon.id)

      if (isBlocked) {
        return currentBlocked.filter((item) => item.id !== pokemon.id)
      }

      setFavorites((currentFavorites) => currentFavorites.filter((fav) => fav.id !== pokemon.id))

      return [...currentBlocked, pokemon]
    })
  }

  useEffect(() => {
    setSelectedTypeFilters((currentFilters) => currentFilters.filter((type) => !blockedTypes.includes(type)))
  }, [blockedTypes])

  const handleTypeFiltersChange = (typeNames) => {
    const nextFilters = typeNames.filter((type) => !blockedTypes.includes(type))
    setSelectedTypeFilters(nextFilters)
  }

  const addBlockedType = () => {
    if (!selectedBlockedType) return

    if (!blockedTypes.includes(selectedBlockedType)) {
      setBlockedTypes((currentBlockedTypes) => [...currentBlockedTypes, selectedBlockedType])
    }

    setSelectedBlockedType('')
  }

  const removeBlockedType = (typeName) => {
    setBlockedTypes((currentBlockedTypes) => currentBlockedTypes.filter((type) => type !== typeName))
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.16),_transparent_35%),linear-gradient(135deg,_#f8fafc_0%,_#fff7ed_100%)] text-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Header />

        <div className="flex flex-col gap-6 lg:flex-row">
          <main className="flex-1 space-y-6">
            <section className="rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur sm:p-6">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                suggestions={pokemonNames}
                onSelectSuggestion={setSearchTerm}
              />
            </section>

            <section className="rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur sm:p-6">
              <StatsPanel pokemons={pokemons} favorites={favorites} blocked={blocked} />
            </section>

            <section className="rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur sm:p-6">
              {loading && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  Cargando Pokémon...
                </div>
              )}

              {error && !loading && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {!loading && !error && filteredPokemon.length > 0 && (
                <PokemonList
                  pokemons={filteredPokemon}
                  favorites={favorites}
                  blocked={blocked}
                  onToggleFavorite={toggleFavorite}
                  onToggleBlocked={toggleBlocked}
                  onRefresh={() => loadPokemons(12, selectedTypeFilters, favorites, blocked, blockedTypes)}
                  pokemonTypes={pokemonTypes.filter((type) => !blockedTypes.includes(type))}
                  selectedTypeFilters={selectedTypeFilters}
                  onTypeFilterChange={handleTypeFiltersChange}
                />
              )}

              {!loading && !error && filteredPokemon.length === 0 && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  Sin resultados
                </div>
              )}
            </section>
          </main>

          <aside className="w-full space-y-6 lg:w-80">
            <section className="rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur sm:p-6">
              <FavoritesPanel favorites={favorites} onToggleFavorite={toggleFavorite} />
            </section>

            <section className="rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">Bloqueados</h2>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    Tipos y Pokémon
                  </span>
                </div>

                <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <label className="block text-sm font-semibold text-slate-700" htmlFor="blocked-type-select">
                    Bloquear tipo
                  </label>
                  <select
                    id="blocked-type-select"
                    value={selectedBlockedType}
                    onChange={(event) => setSelectedBlockedType(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-400"
                  >
                    <option value="">Selecciona un tipo</option>
                    {pokemonTypes.filter((type) => !blockedTypes.includes(type)).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addBlockedType}
                    className="w-full rounded-xl bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
                  >
                    Aplicar bloqueo
                  </button>
                </div>

                {blockedTypes.length > 0 && (
                  <div className="space-y-2">
                    {blockedTypes.map((typeName) => (
                      <div key={typeName} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <div>
                          <p className="text-sm font-semibold capitalize text-slate-900">{typeName}</p>
                          <p className="text-xs text-slate-500">Tipo bloqueado</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeBlockedType(typeName)}
                          className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700"
                        >
                          Quitar
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {blocked.length > 0 && (
                  <div className="space-y-2">
                    {blocked.map((pokemon) => (
                      <div key={pokemon.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <div className="flex items-center gap-3">
                          <img src={pokemon.image} alt={pokemon.name} className="h-10 w-10 object-contain" />
                          <div>
                            <p className="text-sm font-semibold capitalize text-slate-900">{pokemon.name}</p>
                            <p className="text-xs text-slate-500">#{pokemon.id}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleBlocked(pokemon)}
                          className="rounded-lg border border-emerald-300 bg-white px-2 py-1 text-xs font-medium text-emerald-600"
                        >
                          Desbloquear
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {blocked.length === 0 && blockedTypes.length === 0 && (
                  <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-3 text-sm text-slate-500">
                    No hay Pokémon ni tipos bloqueados.
                  </p>
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default App

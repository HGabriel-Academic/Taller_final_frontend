import { useEffect, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import StatsPanel from './components/StatsPanel'
import PokemonList from './components/PokemonList'
import FavoritesPanel from './components/FavoritesPanel'
import TeamSection from './components/TeamSection'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [pokemons, setPokemons] = useState([])
  const [favorites, setFavorites] = useState([])
  const [blocked, setBlocked] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12')

        if (!response.ok) {
          throw new Error('No se pudieron cargar los Pokémon')
        }

        const data = await response.json()
        const details = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url)
            const detailData = await detailResponse.json()

            return {
              id: detailData.id,
              name: detailData.name,
              image: detailData.sprites.other['official-artwork'].front_default,
            }
          })
        )

        setPokemons(details)
      } catch (err) {
        setError(err.message || 'Ocurrió un error inesperado')
      } finally {
        setLoading(false)
      }
    }

    loadPokemons()
  }, [])

  const filteredPokemon = pokemons.filter((pokemon) => {
    const isBlocked = blocked.some((item) => item.id === pokemon.id)

    if (isBlocked) return false

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Header />

        <div className="flex flex-col gap-6 lg:flex-row">
          <main className="flex-1 space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <StatsPanel pokemons={pokemons} favorites={favorites} blocked={blocked} />
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
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
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <FavoritesPanel favorites={favorites} onToggleFavorite={toggleFavorite} />
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <div>
                <h2 className="mb-3 text-lg font-semibold text-slate-900">Bloqueados</h2>

                {blocked.length === 0 ? (
                  <p className="text-sm text-slate-500">No hay Pokémon bloqueados.</p>
                ) : (
                  <div className="space-y-3">
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
                          onClick={() => toggleBlocked(pokemon)}
                          className="rounded-lg border border-emerald-300 bg-white px-2 py-1 text-xs font-medium text-emerald-600"
                        >
                          Desbloquear
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <TeamSection />
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default App

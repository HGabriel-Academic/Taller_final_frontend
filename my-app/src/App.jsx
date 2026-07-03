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
              <StatsPanel pokemons={pokemons} favorites={favorites} />
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
                <PokemonList pokemons={filteredPokemon} favorites={favorites} onToggleFavorite={toggleFavorite} />
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
              <TeamSection />
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default App

import PokemonCard from './PokemonCard'

export default function PokemonList({ pokemons = [], favorites = [], blocked = [], onToggleFavorite, onToggleBlocked }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Pokémon disponibles</h2>
          <p className="text-sm text-slate-500">Explora la colección cargada desde la API.</p>
        </div>
        <span className="inline-flex w-fit rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
          {pokemons.length} resultados
        </span>
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

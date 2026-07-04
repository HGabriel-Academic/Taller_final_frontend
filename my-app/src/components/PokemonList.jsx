import PokemonCard from './PokemonCard'

export default function PokemonList({ pokemons = [], favorites = [], blocked = [], onToggleFavorite, onToggleBlocked }) {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Pokémon</h2>
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

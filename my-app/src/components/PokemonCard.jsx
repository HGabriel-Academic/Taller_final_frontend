export default function PokemonCard({ pokemon, isFavorite, isBlocked, onToggleFavorite, onToggleBlocked }) {
  const { id, name, image } = pokemon

  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm">
      <img src={image} alt={name} className="mx-auto h-28 w-28 object-contain" />
      <p className="mt-2 text-sm font-medium text-slate-500">#{id}</p>
      <h3 className="text-lg font-semibold capitalize text-slate-900">{name}</h3>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => onToggleFavorite(pokemon)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${
            isFavorite
              ? 'border-amber-400 bg-amber-500 text-white'
              : 'border-amber-300 bg-amber-50 text-amber-700'
          }`}
        >
          {isFavorite ? 'Quitar' : 'Favorito'}
        </button>
        <button
          onClick={() => onToggleBlocked(pokemon)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${
            isBlocked
              ? 'border-emerald-400 bg-emerald-500 text-white'
              : 'border-slate-300 bg-white text-slate-700'
          }`}
        >
          {isBlocked ? 'Desbloquear' : 'Bloquear'}
        </button>
      </div>
    </article>
  )
}

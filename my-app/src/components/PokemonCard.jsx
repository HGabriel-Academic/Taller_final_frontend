export default function PokemonCard({ pokemon, isFavorite, isBlocked, onToggleFavorite, onToggleBlocked }) {
  const { id, name, image } = pokemon

  return (
    <article className="group rounded-[24px] border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="rounded-[20px] bg-gradient-to-br from-red-50 via-white to-amber-50 p-3">
        <img src={image} alt={name} className="mx-auto h-28 w-28 object-contain" />
      </div>

      <div className="mt-4 text-left">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">#{id}</p>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
            Disponible
          </span>
        </div>
        <h3 className="mt-2 text-lg font-semibold capitalize text-slate-900">{name}</h3>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => onToggleFavorite(pokemon)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
            isFavorite
              ? 'border-amber-400 bg-amber-500 text-white'
              : 'border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100'
          }`}
        >
          {isFavorite ? 'Quitar' : 'Favorito'}
        </button>
        <button
          type="button"
          onClick={() => onToggleBlocked(pokemon)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
            isBlocked
              ? 'border-emerald-400 bg-emerald-500 text-white'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          {isBlocked ? 'Desbloquear' : 'Bloquear'}
        </button>
      </div>
    </article>
  )
}

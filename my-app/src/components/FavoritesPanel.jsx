export default function FavoritesPanel({ favorites = [], onToggleFavorite }) {
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Favoritos</h2>

      {favorites.length === 0 ? (
        <p className="text-sm text-slate-500">No hay favoritos aún.</p>
      ) : (
        <div className="space-y-3">
          {favorites.map((pokemon) => (
            <div key={pokemon.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center gap-3">
                <img src={pokemon.image} alt={pokemon.name} className="h-10 w-10 object-contain" />
                <div>
                  <p className="text-sm font-semibold capitalize text-slate-900">{pokemon.name}</p>
                  <p className="text-xs text-slate-500">#{pokemon.id}</p>
                </div>
              </div>
              <button
                onClick={() => onToggleFavorite(pokemon)}
                className="rounded-lg border border-red-300 bg-white px-2 py-1 text-xs font-medium text-red-600"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

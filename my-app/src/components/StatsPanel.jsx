export default function StatsPanel({ pokemons = [], favorites = [], blocked = [] }) {
  const total = pokemons.length
  const favoritos = favorites.length
  const bloqueados = blocked.length

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Estadísticas</h2>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-4">
          <p className="text-sm text-slate-500">Total cargados</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{total}</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-700">Favoritos</p>
          <p className="mt-2 text-2xl font-semibold text-amber-900">{favoritos}</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm text-emerald-700">Bloqueados</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-900">{bloqueados}</p>
        </div>
      </div>
    </div>
  )
}

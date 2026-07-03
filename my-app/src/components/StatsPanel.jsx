export default function StatsPanel({ pokemons = [] }) {
  const total = pokemons.length
  const favoritos = 0
  const bloqueados = 0

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Estadísticas</h2>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Total cargados</p>
          <p className="text-2xl font-semibold text-slate-900">{total}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Favoritos</p>
          <p className="text-2xl font-semibold text-slate-900">{favoritos}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Bloqueados</p>
          <p className="text-2xl font-semibold text-slate-900">{bloqueados}</p>
        </div>
      </div>
    </div>
  )
}

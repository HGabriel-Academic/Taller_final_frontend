export default function TeamSection() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Integrantes</h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
          Editable
        </span>
      </div>

      <p className="text-sm text-slate-500">
        Agrega los nombres de tus integrantes para personalizar el equipo.
      </p>

      <textarea
        defaultValue={"Nombre 1\nNombre 2"}
        rows={6}
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
      />
    </div>
  )
}

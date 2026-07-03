export default function TeamSection() {
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Integrantes</h2>
      <textarea
        defaultValue={"Nombre 1\nNombre 2"}
        rows={6}
        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-red-400"
      />
    </div>
  )
}

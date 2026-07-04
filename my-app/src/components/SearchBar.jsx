export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 sm:flex-row sm:items-center sm:p-4">
      <div className="flex-1">
        <label htmlFor="pokemon-search" className="mb-1 block text-sm font-semibold text-slate-700">
          Buscar Pokémon
        </label>
        <input
          id="pokemon-search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Escribe un nombre..."
          aria-label="buscar Pokémon"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
        />
      </div>

      <button
        type="button"
        className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
      >
        Buscar
      </button>
    </div>
  )
}

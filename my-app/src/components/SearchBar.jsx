export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar Pokémon..."
        aria-label="buscar Pokémon"
        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none ring-0 focus:border-red-400"
      />
      <button className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700">
        Buscar
      </button>
    </div>
  )
}

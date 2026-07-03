export default function Header() {
  return (
    <header className="rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">PokeApp</p>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Pokédex inicial</h1>
        </div>
        <p className="text-sm text-slate-500">React + Vite + Tailwind · Día 1</p>
      </div>
    </header>
  )
}

export default function Header() {
  return (
    <header className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-red-600 px-5 py-6 text-white shadow-lg sm:px-7 sm:py-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-red-100 backdrop-blur">
            PokeApp
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Pokédex inicial</h1>
          <p className="mt-2 max-w-xl text-sm text-slate-200 sm:text-base">
            Explora Pokémon, guarda favoritos y organiza tu equipo con una interfaz limpia y responsiva.
          </p>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-slate-100 backdrop-blur">
          <p className="font-semibold">React + Vite + Tailwind</p>
          <p className="text-xs text-slate-300">Diseño final · Lista dinámica</p>
        </div>
      </div>
    </header>
  )
}

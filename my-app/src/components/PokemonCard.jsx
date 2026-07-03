export default function PokemonCard({ pokemon }) {
  const { id, name, image } = pokemon

  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm">
      <img src={image} alt={name} className="mx-auto h-28 w-28 object-contain" />
      <p className="mt-2 text-sm font-medium text-slate-500">#{id}</p>
      <h3 className="text-lg font-semibold capitalize text-slate-900">{name}</h3>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700">
          Favorito
        </button>
        <button className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700">
          Bloquear
        </button>
      </div>
    </article>
  )
}

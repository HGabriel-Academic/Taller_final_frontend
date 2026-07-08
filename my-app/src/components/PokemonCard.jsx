import { useState } from 'react'

export default function PokemonCard({ pokemon, isFavorite, isBlocked, onToggleFavorite, onToggleBlocked }) {
  const { id, name, image, types = [], height, weight, abilities = [], stats = [], moves = [], speciesUrl, locationsUrl } = pokemon
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detailInfo, setDetailInfo] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  const handleOpenModal = async () => {
    if (detailInfo && detailInfo.id === id) {
      setIsModalOpen(true)
      return
    }

    setLoadingDetails(true)

    try {
      const [speciesResponse, locationsResponse] = await Promise.all([
        fetch(speciesUrl),
        fetch(locationsUrl),
      ])

      const speciesData = await speciesResponse.json()
      const locationsData = await locationsResponse.json()
      const description = speciesData.flavor_text_entries.find((entry) => entry.language.name === 'es')?.flavor_text || 'Sin descripción disponible.'

      let evolutionChain = []

      if (speciesData.evolution_chain?.url) {
        const evolutionResponse = await fetch(speciesData.evolution_chain.url)
        const evolutionData = await evolutionResponse.json()

        let current = evolutionData.chain

        while (current) {
          evolutionChain.push(current.species.name)
          current = current.evolves_to[0]
        }
      }

      setDetailInfo({
        id,
        description,
        locations: locationsData.slice(0, 5).map((location) => location.location_area.name.replace(/-/g, ' ')),
        evolutionChain,
      })
      setIsModalOpen(true)
    } catch (error) {
      console.error(error)
      setDetailInfo({
        id,
        description: 'No se pudo cargar la información adicional.',
        locations: [],
        evolutionChain: [],
      })
      setIsModalOpen(true)
    } finally {
      setLoadingDetails(false)
    }
  }

  return (
    <>
      <article className="group rounded-[24px] border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <button type="button" onClick={handleOpenModal} className="w-full text-left">
          <div className="rounded-[20px] bg-gradient-to-br from-red-50 via-white to-amber-50 p-3">
            <img src={image} alt={name} className="mx-auto h-28 w-28 object-contain" />
          </div>

          <div className="mt-4 text-left">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">#{id}</p>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                Disponible
              </span>
            </div>
            <h3 className="mt-2 text-lg font-semibold capitalize text-slate-900">{name}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {types.map((type) => (
                <span key={type} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </button>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => onToggleFavorite(pokemon)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
              isFavorite
                ? 'border-amber-400 bg-amber-500 text-white'
                : 'border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            {isFavorite ? 'Quitar' : 'Favorito'}
          </button>
          <button
            type="button"
            onClick={() => onToggleBlocked(pokemon)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
              isBlocked
                ? 'border-emerald-400 bg-emerald-500 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {isBlocked ? 'Desbloquear' : 'Bloquear'}
          </button>
        </div>
      </article>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700"
            >
              Cerrar
            </button>

            {loadingDetails ? (
              <div className="py-10 text-center text-sm text-slate-600">Cargando información...</div>
            ) : (
              <div className="space-y-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img src={image} alt={name} className="h-32 w-32 object-contain" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">#{id}</p>
                    <h3 className="text-2xl font-bold capitalize text-slate-900">{name}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {types.map((type) => (
                        <span key={type} className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-sm font-semibold text-slate-900">Altura</p>
                    <p className="text-sm text-slate-600">{height / 10} m</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-sm font-semibold text-slate-900">Peso</p>
                    <p className="text-sm text-slate-600">{weight / 10} kg</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Descripción</h4>
                  <p className="mt-2 text-sm text-slate-700">{detailInfo?.description}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Habilidades</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {abilities.map((ability) => (
                      <span key={ability} className="rounded-full bg-slate-100 px-2.5 py-1 text-sm text-slate-700">
                        {ability}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Estadísticas</h4>
                  <div className="mt-3 space-y-2">
                    {stats.map((stat) => (
                      <div key={stat.name}>
                        <div className="flex items-center justify-between text-sm text-slate-600">
                          <span className="capitalize">{stat.name}</span>
                          <span className="font-semibold text-slate-900">{stat.value}</span>
                        </div>
                        <div className="mt-1 h-2 rounded-full bg-slate-100">
                          <div className="h-2 rounded-full bg-red-500" style={{ width: `${Math.min(stat.value, 100)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Movimientos</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {moves.map((move) => (
                      <span key={move} className="rounded-full border border-slate-200 px-2.5 py-1 text-sm text-slate-700">
                        {move}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Dónde aparece</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {detailInfo?.locations?.length ? (
                      detailInfo.locations.map((location) => (
                        <span key={location} className="rounded-full bg-slate-100 px-2.5 py-1 text-sm text-slate-700">
                          {location}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-600">No hay ubicaciones disponibles.</span>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Evoluciones</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {detailInfo?.evolutionChain?.length ? (
                      detailInfo.evolutionChain.map((stage) => (
                        <span key={stage} className="rounded-full bg-amber-50 px-2.5 py-1 text-sm text-amber-700">
                          {stage}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-600">No hay cadena evolutiva disponible.</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

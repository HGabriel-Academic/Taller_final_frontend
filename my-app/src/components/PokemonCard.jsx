import React from 'react'

export default function PokemonCard({ pokemon }){
  const { id, name, image } = pokemon
  return (
    <div className="card pokemon-card">
      <img src={image} alt={name} />
      <div className="pokemon-id">#{id}</div>
      <div className="pokemon-name">{name}</div>

      <div className="actions">
        <button className="btn">Favorito</button>
        <button className="btn ghost">Bloquear</button>
      </div>
    </div>
  )
}

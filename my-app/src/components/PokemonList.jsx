import React from 'react'
import PokemonCard from './PokemonCard'

export default function PokemonList({ pokemons=[] }){
  return (
    <div>
      <div className="panel-title">Pokémon</div>
      <div className="grid">
        {pokemons.map(p=> (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  )
}

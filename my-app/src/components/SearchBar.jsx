import React from 'react'

export default function SearchBar(){
  return (
    <div className="search">
      <input placeholder="Buscar Pokémon..." aria-label="buscar" />
      <button className="btn">Buscar</button>
    </div>
  )
}

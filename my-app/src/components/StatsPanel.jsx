import React from 'react'

export default function StatsPanel({ pokemons=[] }){
  const total = pokemons.length
  const ids = pokemons.map(p=>p.id)
  const max = Math.max(...ids)
  const min = Math.min(...ids)

  return (
    <div>
      <div className="panel-title">Estadísticas</div>
      <div style={{display:'flex',gap:12}}>
        <div className="card" style={{flex:1}}>
          <div className="muted">Total</div>
          <div style={{fontWeight:700,fontSize:20}}>{total}</div>
        </div>
        <div className="card" style={{flex:1}}>
          <div className="muted">ID menor</div>
          <div style={{fontWeight:700,fontSize:20}}>{min}</div>
        </div>
        <div className="card" style={{flex:1}}>
          <div className="muted">ID mayor</div>
          <div style={{fontWeight:700,fontSize:20}}>{max}</div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'

export default function TeamSection(){
  return (
    <div>
      <div className="panel-title">Integrantes</div>
      <div>
        <textarea defaultValue={"Nombre 1\nNombre 2"} rows={6} style={{width:'100%',borderRadius:8,border:'1px solid #e5e7eb',padding:8}} />
      </div>
    </div>
  )
}

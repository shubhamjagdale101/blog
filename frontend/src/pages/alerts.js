import React from 'react'

const Alerts = ({msg,type}) => {
  return (
    <span style={{position:"absolute", bottom:'50px', right:'15px', 
    backgroundColor: (type==='success')?"green":(type==="process")?"blue":"red", padding:'10px', borderRadius:'10px', border:"2px solid black", color:'white'}}>
      {msg}
    </span>
  )
}

export default Alerts

import React from 'react'
import { Link } from 'react-router-dom'

function Sucess() {
  return (
    <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
                  Votre Paiement a été effectué avec success.
  <Link to="/"><button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button></Link>  
  </div>
  )
}

export default Sucess
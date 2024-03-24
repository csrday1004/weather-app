import React from 'react'

const Button = ({city,setCity}) => {
  return (
    <button className="타지역" onClick={()=>{
      setCity(city)
    }}>{city}</button>
  )
}

export default Button
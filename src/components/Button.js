import React from 'react'

const Button = ({city,setCity,removeClass,isSelected}) => {
  return (
    <button className={isSelected ? 'selected' : ''} onClick={(e)=>{
      removeClass()
      setCity(city)
    }}>{city}</button>
  )
}

export default Button
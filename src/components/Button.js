import React from 'react'

const Button = ({city,setCity,removeClass,isSelected}) => {
  console.log('선택된나?',isSelected)
  return (
    <button className={isSelected ? 'selected' : ''} onClick={(e)=>{
      removeClass()
      setCity(city)
    }}>{city}</button>
  )
}

export default Button
import React from 'react'

const Button = ({city,setCity,removeClass,setSelectBtn,index,selectBtn}) => {
  
  return (
    <button className={selectBtn===index ? 'selected' : ''} onClick={(e)=>{
      setSelectBtn(index)
      removeClass()
      setCity(city)
    }}>{city}</button>
  )
}

export default Button

//selected={selectBtn===index}
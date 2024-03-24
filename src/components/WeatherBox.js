import React from 'react'

const WeatherBox = ({city,temp,weather}) => {
  return (
    <div className="날씨정보박스 weather-info">
            <div className="지역 location">{city}</div>
            <div className="온도 temps">
              <div className="섭씨 temp">{(temp - 273.15).toFixed(1)}°C</div>/
              <div className="화씨 temp">
                {(((temp - 273.15) * 9) / 5 + 32).toFixed(1)}°F
              </div>
            </div>
            <div className="날씨 weather">{weather}</div>
          </div>
  )
}

export default WeatherBox
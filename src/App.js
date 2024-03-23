import { useEffect, useState } from "react";
import "./App.css";

// 1.앱 실행 시 현재 기반 위치의 날씨가 보인다.
// 2. 도시, 섭씨, 화씨, 날씨 상태가 보임
// 3. 5개의 버튼이 있다. (1개는 현재, 4개는 타도시)
// 4. 도시 버튼 클릭 시 해당 도시 날씨정보로 교체
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터 받는 동안 로딩 스피너 작동

function App() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(0);
  const [weather, SetWeather] = useState("");

  const API_key = "aaf482e72ea857208ac4c9c8f4f60b6e";

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&lang={ko}`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    setCity(data.name);
    setTemp(data.main.temp);
    SetWeather(data.weather[0].main);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log("현재 위치:", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="배경 bg">
      <div className="큰틀 container">
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

        <div className="지역버튼박스 buttons">
          <button className="selected">현재위치</button>
          <button className="타지역">타지역</button>
          <button className="타지역">타지역</button>
          <button className="타지역">타지역</button>
          <button className="타지역">타지역</button>
        </div>
      </div>
    </div>
  );
}

export default App;

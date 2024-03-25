import { useEffect, useState, CSSProperties, useRef } from "react";
import "./App.css";
import Button from "./components/Button";
import ClipLoader from "react-spinners/ClipLoader";
import WeatherBox from "./components/WeatherBox";

// 1.앱 실행 시 현재 기반 위치의 날씨가 보인다.
// 2. 도시, 섭씨, 화씨, 날씨 상태가 보임
// 3. 5개의 버튼이 있다. (1개는 현재, 4개는 타도시)
// 4. 도시 버튼 클릭 시 해당 도시 날씨정보로 교체
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터 받는 동안 로딩 스피너 작동

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "gray",
};

function App() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState();
  const [weather, SetWeather] = useState("");
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const [selectBtn, setSelectBtn] = useState(false);

  const currentLocationRef = useRef(null);
  // 현재위치버튼의 css클래스 지우기
  const removeClass = () => {
    currentLocationRef.current.classList.remove("selected");
  };

  const API_key = "aaf482e72ea857208ac4c9c8f4f60b6e";

  // 현재위치로 날씨 불러오기
  const getWeatherByCurrentLocation = async (lat, lon) => {
 try{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    setCity(data.name);
    setTemp(data.main.temp);
    SetWeather(data.weather[0].main);
    setLoading(false);
  }catch(error){
    console.error('에러남',error)
    setLoading(false)
  }
  };

  // 지역위치로 날씨 불러오기
  const getWeatherByCityName = async () => {
    try{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${API_key}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setTemp(data.main.temp);
    SetWeather(data.weather[0].main);
    setLoading(false);
    }catch(error){
      console.error('에러남',error)
      setLoading(false)
    }
  };

  // 현재위치 불러오기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      // console.log("현재 위치:", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (city) {
      getWeatherByCityName();
    }
  }, [city]);

  return (
    <div className="배경 bg">
      <div className="큰틀 container">
        {loading ? (
          <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            <WeatherBox city={city} temp={temp} weather={weather} />

            <div className="지역버튼박스 buttons">
              {/* 시티가  */}
              <button
                ref={currentLocationRef}
                className="selected"
                onClick={() => {
                  currentLocationRef.current.classList.add("selected");
                  getCurrentLocation();
                  setSelectBtn(false)
                }}
              >
                현재위치
              </button>
              {cities.map((e, index) => {
                // 누른 버튼이랑 현재버튼의 인덱스가 같으면 클래스 추가?
                return (
                  <Button
                    city={e}
                    setCity={setCity}
                    removeClass={removeClass}
                    index={index}
                    setSelectBtn={setSelectBtn}
                    selectBtn={selectBtn} 
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

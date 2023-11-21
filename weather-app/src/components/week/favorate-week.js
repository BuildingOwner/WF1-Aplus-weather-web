import "../../css/week/favorate-week.css";
import WeekWeather from "./week-item";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { useState, useEffect } from "react";
// import { useWeekTemp } from "../../hooks/useWeekTemp";
// import { useWeekCloud } from "../../hooks/useWeekCloud";

// const favoraiteCity = ["서울", "인천", "대구", "수원", "부산"];

// const FavorateWeek = ({ locationFormat, weather, tempCode, weatherCode }) => {
//   const [favorateWeather, setFavorateWeather] = useState([]);
import { useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import axios from "axios";

const FavorateWeek = ({ location,valid }) => {

  const navigate = useNavigate();
  const auth = useSelector((state) => state.user.user?.username);
  const isLoggedIn = auth !== undefined; 

  const [tempCode, setTempCode] = useState(null);
  const [weatherCode, setWeatherCode] = useState(null);
  const [cityName, setCityName] = useState(null);
  
  const handleSave = () => {
    // 로그인 상태를 확인합니다.
    if (!isLoggedIn) { // 만약 로그인하지 않았다면,
      console.log("로그인 안함 ");
      navigate('/login'); // 로그인 페이지로 리다이렉트합니다.
      return; // 함수를 종료합니다.
    }
    console.log(auth);
    axios.post('http://localhost:4000/saveFavoriteLocation', { location }, {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})
.then((response) => {
  alert("Saved!");
  console.log('Saved!', response.data);
})
.catch((error) => {
  console.error('Error:', error);
});

  };
  

  useEffect(() => {
    fetch("/data/temp-code.json")
      .then((response) => response.json())
      .then((data) => {
        setTempCode(data);

    let cityName = location
    ? location
    .split(" ")[1]
    .replace("특별시", "")
    .replace("광역시", "")
    .replace("시", "")
    .replace("특별자치도", "")
    .replace("특별자치시", "")
    : null;   

        setCityName(cityName);
      });
  }, [location]);

  useEffect(() => {
    setFavorateWeather(weather);
  }, [weather]);

  const weekTemp = useWeekTemp(tempCode ? tempCode[favoraiteCity[0]] : null);
  const weekCloud = useWeekCloud(
    weatherCode ? weatherCode[favoraiteCity[0]] : null
  );

  const ChangeCity = (city) => {
    const { temps } = weekTemp(city);
    const { rainRate, cloud } = weekCloud(city);
    const changeWeather = temps.map((temp, i) => ({
      temp: temp,
      rainRate: rainRate[i],
      cloud: cloud[i],
    }));

//     setFavorateWeather(changeWeather);
  };
  const currentLocation = location ? location.split(" ") : [];
  let locationFormat = [];
  for (let i = 0; i < 3; i++) {
    locationFormat.push(currentLocation[i]);
  }

  if (weather.length == 0) return <div className="favoraite-week"></div>;
  const settings = {
    arrows: false, // 양 끝 화살표 생성여부
    dots: true, // 슬라이더 아래에 슬라이드 개수를 점 형태로 표시
    infinite: true, // 슬라이드가 맨 끝에 도달했을 때 처음 슬라이드를 보여줄지 여부
    slidesToShow: 4, // 화면에 한번에 표시할 슬라이드 개수 설정
    slidesToScroll: 2, // 옆으로 스크롤할 때 보여줄 슬라이드 수 설정
    autoplay: false, // 슬라이드를 자동으로 넘길지 여부
  };

  return (
    <div className="favorate-current-week
//       <div className="favorate-current-week-top">
//         <h2>{locationFormat.join(" ")}</h2>
//         <select
//           className="form-select"
//           aria-label="Default select example"
//           onChange={(e) => ChangeCity(e.target.value)}
//         >
//           <option selected>Open this select menu</option>
//           {favoraiteCity.map((cityName, i) => (
//             <option key={i} value={cityName}>
//               {cityName}
//             </option>
//           ))}
//         </select>
//       </div>

      <h2>{locationFormat.join(" ")}</h2>
      {valid && <button onClick={handleSave}>저장</button>} {/* 저장 버튼 추가 */}
      <Slider {...settings}>
        {favorateWeather.map((weatherItem, i) => (
          <WeekWeather key={i} days={i + 3} {...weatherItem} />
        ))}
      </Slider>
    </div>
  );
};

export default FavorateWeek;

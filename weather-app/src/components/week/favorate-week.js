import "../../css/week/favorate-week.css";
import WeekWeather from "./week-item";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import { useWeekTemp } from "../../hooks/useWeekTemp";
import { useWeekCloud } from "../../hooks/useWeekCloud";

const favoraiteCity = ["서울", "인천", "대구", "수원", "부산"];

const FavorateWeek = ({ locationFormat, weather, tempCode, weatherCode }) => {
  const [favorateWeather, setFavorateWeather] = useState([]);

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

    setFavorateWeather(changeWeather);
  };

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
    <div className="favorate-current-week">
      <div className="favorate-current-week-top">
        <h2>{locationFormat.join(" ")}</h2>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => ChangeCity(e.target.value)}
        >
          <option selected>Open this select menu</option>
          {favoraiteCity.map((cityName, i) => (
            <option key={i} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>
      </div>

      <Slider {...settings}>
        {favorateWeather.map((weatherItem, i) => (
          <WeekWeather key={i} days={i + 3} {...weatherItem} />
        ))}
      </Slider>
    </div>
  );
};

export default FavorateWeek;

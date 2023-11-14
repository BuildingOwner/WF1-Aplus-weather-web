import "../../css/expension/ex-today.css";
import useTodayWeather from "../../hooks/useTodayWeather";
import ExTodayItem from "./ex-today-item";
import ExCurrent from "./ex-current";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ExToday = () => {
  const { skys, temps, rains, todayTemp } = useTodayWeather(123);

  if (
    !skys ||
    !temps ||
    !rains ||
    skys.length === 0 ||
    temps.length === 0 ||
    rains.length === 0
  )
    return <div className="week"></div>;

  const weather = temps.map((temp, i) => ({
    sky: skys[i],
    temp: temp,
    rain: rains[i],
  }));

  const settings = {
    arrows: false, // 양 끝 화살표 생성여부
    dots: false, // 슬라이더 아래에 슬라이드 개수를 점 형태로 표시
    infinite: false, // 슬라이드가 맨 끝에 도달했을 때 처음 슬라이드를 보여줄지 여부
    slidesToShow: 5, // 화면에 한번에 표시할 슬라이드 개수 설정
    slidesToScroll: 3, // 옆으로 스크롤할 때 보여줄 슬라이드 수 설정
    autoplay: false, // 슬라이드를 자동으로 넘길지 여부
  };

  const now = new Date();
  const time = [2, 5, 8, 11, 14, 17, 20, 23]
  let currentHour = now.getHours();
  let closest = time.reduce((prev, curr) => 
  Math.abs(curr - currentHour) < Math.abs(prev - currentHour) ? curr : prev);

  return (
    <>
      <ExCurrent todayTemp={todayTemp} sky={skys[1]} temp={temps[1]} />
      <div className="ex-today-item-container">
        <Slider {...settings}>
          {weather.map((weatherItem, i) => (
            <ExTodayItem
              key={i}
              time={closest + i}
              {...weatherItem}
            />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ExToday;

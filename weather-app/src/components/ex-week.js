import "../css/ex-week.css"
import { useState, useEffect } from "react";
import { useWeekTemp } from "../hooks/week-temp";
import { useWeekCloud } from "../hooks/week-cloud";
import ExWeekItem from "./ex-week-item";

const ExWeek = ({location}) => {
  const [tempCode, setTempCode] = useState(null);
  const [weatherCode, setWeatherCode] = useState(null);
  const [cityName, setCityName] = useState(null);

  useEffect(() => {
    fetch("/data/temp-code.json")
      .then((response) => response.json())
      .then((data) => {
        setTempCode(data);
        let cityName = location
          .split(" ")[1]
          .replace("특별시", "")
          .replace("광역시", "")
          .replace("시", "")
          .replace("특별자치도", "")
          .replace("특별자치시", "");
        setCityName(cityName);
      });
  }, [location]);

  useEffect(() => {
    fetch("/data/weather-code.json")
      .then((response) => response.json())
      .then((data) => {
        setWeatherCode(data);
      });
  }, [location]);

  const { temps } = useWeekTemp(
    cityName && tempCode ? tempCode[cityName] : null
  );
  const { rainRate, cloud } = useWeekCloud(
    cityName && weatherCode ? weatherCode[cityName] : null
  );

  if (
    !temps ||
    !rainRate ||
    !cloud ||
    temps.length === 0 ||
    rainRate.length === 0 ||
    cloud.length === 0
  )
    return <div className="expension-week"></div>;

  const weather = temps.map((temp, i) => ({
    temp: temp,
    rainRate: rainRate[i],
    cloud: cloud[i],
  }));

  return (
    <div className="expension-week">
      <div className="expension-week-container">
        {weather.map((weatherItem, i) => (
          <ExWeekItem key={i} days={i + 3} {...weatherItem} />
        ))}
      </div>
    </div>
  )
};

export default ExWeek;

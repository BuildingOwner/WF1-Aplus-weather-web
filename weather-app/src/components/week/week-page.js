import FavorateWeek from "./favorate-week";
import Week from "./week";
import { useState, useEffect } from "react";
import { useWeekTemp } from "../../hooks/useWeekTemp";
import { useWeekCloud } from "../../hooks/useWeekCloud";

const WeekPage = ({ location }) => {
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

  const weather = temps.map((temp, i) => ({
    temp: temp,
    rainRate: rainRate[i],
    cloud: cloud[i],
  }));

  const currentLocation = location.split(' ')
  let locationFormat = []
  for(let i=0; i<3; i++){
    locationFormat.push(currentLocation[i]);
  }

  return (
    <div className="week-page">
      <FavorateWeek locationFormat={locationFormat} weather={weather} tempCode={tempCode} weatherCode={weatherCode}/>
      <Week locationFormat={locationFormat} weather={weather} />
    </div>
  );
};

export default WeekPage;

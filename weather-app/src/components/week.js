import { useWeekTemp } from "../hooks/week-temp";
import { useWeekCloud } from "../hooks/week-cloud";
import WeekWeather from "./weekWeather";

const Week = () => {
  const { temps } = useWeekTemp("11B10101");
  const { rainRate, cloud } = useWeekCloud("11B00000");

  const data = { temps: temps, rainRate: rainRate, cloud: cloud };
  if (temps.length == 0 || rainRate.length == 0 || cloud.length == 0)
    return <div className="week"></div>;

  let weather = [];

  for (let i = 0; i < data.temps.length; i++) {
    let temp = data.temps[i];
    let rainRate = data.rainRate[i];
    let cloud = data.cloud[i];

    let weatherObj = {temp: temp, rainRate:rainRate, cloud:cloud};

    weather.push(weatherObj);
  }

  return (
    <div className="Week">
      {weather.map((weatherItem, i) => {
        return <WeekWeather key={i} days={i+3} {...weatherItem} />;
      })}
    </div>
  );
};
export default Week;

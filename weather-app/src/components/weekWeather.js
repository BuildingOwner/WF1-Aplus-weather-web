import '../css/weather-item.css'

const WeekWeather = ({ days, temp, rainRate, cloud }) => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  let day = String(now.getDate()+days).padStart(2, "0");
  const hour = now.getHours();
  if (hour < 6) {
    day = String(now.getDate() - 1).padStart(2, "0");
  }

  if (!cloud && !rainRate && !temp) return <div></div>;

  let cloudy;
  if (cloud && cloud.cloud == undefined) {
    cloudy = `${cloud.am} / ${cloud.pm}`;
  } else {
    cloudy = cloud.cloud;
  }

  let rain;
  if (rainRate && rainRate.rain == undefined) {
    rain = `${rainRate.am}% / ${rainRate.pm}%`;
  } else {
    rain = `${rainRate.rain}%`;
  }

  return (
    <div className="weather-item">
      <div>
        <span>
          {month}. {day}
        </span>
        <span> {cloudy}</span>
      </div>
      <div>
        <span>{rain}</span>
        <span>
          {" "}
          {temp.min} / {temp.max}
        </span>
      </div>
    </div>
  );
};

export default WeekWeather;

import "../css/weather-item.css";

const cloudIcon = {
  맑음: "bi-sun",
  흐림: "bi-cloud",
  구름많음: "bi-clouds",
  흐리고비: "bi-cloud-rain",
};

const WeekWeather = ({ days, temp, rainRate, cloud }) => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  let day = String(now.getDate() + days).padStart(2, "0");
  const hour = now.getHours();
  if (hour < 6) {
    day = String(now.getDate() + days - 1).padStart(2, "0");
  }

  if (!cloud && !rainRate && !temp) return <div></div>;

  let cloudy = [];
  if (cloud && cloud.cloud == undefined) {
    cloudy.push(cloud.am);
    cloudy.push(cloud.pm);
  } else {
    cloudy.push(cloud.cloud);
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
        <span>
          {cloudy.map((cloudStr, idx) => {
            return <i key={idx} className={`bi ${cloudIcon[cloudStr]}`}></i>;
          })}
        </span>
      </div>
      <div>
        <span>
          <i className="bi bi-thermometer"></i>{temp.min} / 
          <i className="bi bi-thermometer-high"></i>{temp.max}
        </span>
        <span>
          <i className="bi bi-droplet"></i> {rain}
        </span>
      </div>
    </div>
  );
};

export default WeekWeather;

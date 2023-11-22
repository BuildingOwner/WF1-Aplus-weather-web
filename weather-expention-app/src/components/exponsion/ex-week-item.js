import "../../css/expension/ex-week-item.css";

const cloudIcon = {
  맑음: "bi-sun",
  흐림: "bi-cloud",
  구름많음: "bi-clouds",
  흐리고비: "bi-cloud-rain",
};

const ExWeekItem = ({ days, temp, rainRate, cloud }) => {
  const date = ["일", "월", "화", "수", "목", "금", "토"];
  const now = new Date();
  const futureDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + days
  );
  let month = String(futureDate.getMonth() + 1).padStart(2, "0");
  let day = String(futureDate.getDate()).padStart(2, "0");
  let dayName = date[futureDate.getDay()];

  if (futureDate.getMonth() !== now.getMonth()) {
    month = String(futureDate.getMonth() + 1).padStart(2, "0");
    day = String(futureDate.getDate()).padStart(2, "0");
  }
  const hour = now.getHours();
  if (hour < 6) {
    day = String(now.getDate() + days - 1).padStart(2, "0");
    dayName = date[(now.getDay() + days - 1) % 7];
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
    rain = `${rainRate.am > rainRate.pm ? rainRate.am : rainRate.pm}%`;
  } else {
    rain = `${rainRate.rain}%`;
  }

  return (
    <div className="expention-week-item">
      <span className="expention-week-item-date">
        &nbsp;&nbsp;&nbsp;{day} {dayName}
      </span>
      <span className="expention-week-item-rain">
        <i className="bi bi-umbrella"></i>&nbsp;{rain}
      </span>
      <span className="expention-week-item-cloud-container">
        {cloudy.map((cloudStr, idx) => {
          return (
            <i
              key={idx}
              className={`expention-week-item-cloud bi ${
                cloudIcon[cloudStr.replace(" ", "")]
              }`}
            ></i>
          );
        })}
      </span>
      <span className="expention-week-item-temp">{temp.min}°</span>
      <span className="expention-week-item-temp">{temp.max}°</span>
    </div>
  );
};

export default ExWeekItem;

import "../../css/week/week.css";
import WeekItem from "./week-item";

const Week = ({ locationFormat, weather }) => {
  if (weather.length == 0) return <div className="week"></div>;

  return (
    <div className="current-week">
      <h2>{locationFormat.join(" ")}</h2>
      <div className="week">
        {weather.map((weatherItem, i) => (
          <WeekItem key={i} days={i + 3} {...weatherItem} />
        ))}
      </div>
    </div>
  );
};

export default Week;

import "../../css/expension/expension.css";
import ExWeek from "./ex-week";
import ExToday from "./ex-today";

const Expention = ({ location }) => {
  return (
    <div className="expention">
      <h2>{location.split(" ")[2]}</h2>
      <ExToday />
      <ExWeek location={location} />
    </div>
  );
};

export default Expention;

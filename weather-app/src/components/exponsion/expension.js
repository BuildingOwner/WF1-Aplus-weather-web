import "../../css/expension/expension.css";
import ExWeek from "./ex-week";
import ExToday from "./ex-today";
import ExDust from "./ex-dust";

const Expention = ({ location }) => {
  return (
    <div className="expention">
      <h2 className="expension-current-location">{location.split(" ")[2]}</h2>
      <ExToday />
      <ExWeek location={location} />
      <ExDust />
    </div>
  );
};

export default Expention;

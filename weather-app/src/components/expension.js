import "../css/expension.css"
import ExWeek from "./ex-week";
import ExToday from "./ex-today";

const Expention = ({location}) => {
  return(
    <div className="expention">
      <ExToday />
      <ExWeek location={location}/>
    </div>
  )
}

export default Expention;
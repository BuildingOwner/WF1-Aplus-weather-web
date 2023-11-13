import "../css/expension.css"
import ExWeek from "./ex-week";

const Expention = ({location}) => {
  return(
    <div className="expention">
      <ExWeek location={location}/>
    </div>
  )
}

export default Expention;
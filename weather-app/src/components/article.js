import FavorateWeek from "./week/favorate-week";
import Week from "./week/week";
import NewsMain from "./news/NewsMain"
import Main from "./Main/Main"
import Forecast from "./airPollution/Forecast"
import Weather from "./airPollution/Weather"
import Chart from "./airPollution/Chart"
import Chart2 from "./airPollution/Chart2"

const Article = ({location}) => {
  return (
    <>
      <FavorateWeek location={location} />
      <Week location={location} />
      <NewsMain />
      <Main />
      <div>
      <h4>Weather Forecast</h4>
        <Forecast />
      </div>
      <div className="weather-container">
      <h4>내 지역 상세</h4>
        <Weather />
      </div>
      <div>
        <h4>시간대별 관측 및 예보</h4>
        <Chart />
      </div>
      <div>
        <h4>주간예보</h4>
        <Chart2 />
      </div>
    </>
  );
};

export default Article;

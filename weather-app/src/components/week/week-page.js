import FavorateWeek from "./favorate-week";
import Week from "./week";

const WeekPage = ({ location }) => {
  return (
    <div style={{ minWidth: 1100, height: "100vh" }}>
      <FavorateWeek location={location} />
      <Week location={location} />
    </div>
  );
};

export default WeekPage;

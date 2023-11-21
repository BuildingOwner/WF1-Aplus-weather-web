import LocationSearchInput from "./LocationSearchInput";
import Week from "./week";



const WeekPage = ({ location }) => {
  return (
    <div style={{ minWidth: 1100, height: "100vh" }}>
      <LocationSearchInput/>
      <Week location={location} />
    </div>
  );
};

export default WeekPage;

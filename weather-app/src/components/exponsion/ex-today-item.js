const cloudIcon = {
  1: "bi-sun",
  4: "bi-cloud",
  3: "bi-clouds",
  // 흐리고비: "bi-cloud-rain",
};

const ExTodayItem = ({ sky, temp, rain, time }) => {
  return (
    <div className="ex-today-item">
      <div>{time}시</div>
      <div>
        <i className={`bi ${cloudIcon[sky]}`}></i>
      </div>
      <div>{temp}°</div>
      <div>
        <i className="bi bi-umbrella"></i>&nbsp;
        {rain} %
      </div>
    </div>
  );
};

export default ExTodayItem;

const cloudIcon = {
  1: { class: "bi-sun", str: "맑음" },
  4: { class: "bi-cloud", str: "흐림" },
  3: { class: "bi-clouds", str: "구름 많음" },
  // 흐리고비: "bi-cloud-rain",
};
const ExCurrent = ({ todayTemp, sky, temp }) => {
  return (
    <div className="ex-current">
      <div className="ex-current-info">
        <div>{temp}°</div>
        <div>{cloudIcon[sky].str}</div>
        <div>{Math.floor(todayTemp.min)}° / {Math.floor(todayTemp.max)}°</div>
      </div>
      <div className="ex-current-icon">
        <i className={`bi ${cloudIcon[sky].class}`}></i>
      </div>
    </div>
  );
};

export default ExCurrent;

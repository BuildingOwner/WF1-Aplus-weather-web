import React from "react";
import Weather from "./Weather";
import Sidebar from "../Sidebar/Sidebar";
import "../../css/Main/Weather.css";
import "bootstrap/dist/css/bootstrap.css";
import { ProgressBar } from "react-bootstrap";
import { WiDaySunny } from "react-icons/wi";

function Main() {
  const { data, loading, addStnId } = Weather();
  const handleAdd = () => {
    const newStnId = prompt("새로운 지역의 ID를 입력하세요.");
    if (newStnId) {
      addStnId(newStnId);
    }
  };
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        

        {loading ? (
          <p>데이터 불러오는 중...</p>
        ) : data.length > 0 ? (
          <>
            <div className="data-container">
              {data.map((weather, index) => (
                <div key={index} className="weather-data">
                  <div className="weather-top">
                    <p>{weather.stnNm}</p>
                  </div>
                  <div className="weather-middle">
                    <WiDaySunny size={50} />
                  </div>
                  <div className="weather-bottom">
                    <p>기온: {weather.ta}°C</p>
                  </div>
                </div>
              ))}
              <div className="weather-data">
                <button onClick={handleAdd}>+</button>
              </div>
            </div>
            <div className="weather-summary">
              <h2>날씨요약</h2>
              <div className="summary-container">
                <div className="summary-item">
                  <p className="summary-title">습도</p>
                  <p className="summary-value">{data[0].hm}%</p>
                  <div className="summary-box">
                    <ProgressBar
                      style={{ height: "20px" }}
                      now={data[0].hm}
                      max={100}
                    />
                  </div>
                </div>
                <div className="summary-item">
                  <p className="summary-title">풍속</p>
                  <p className="summary-value">{data[0].ws} m/s</p>
                  <div className="summary-box">
                    <ProgressBar
                      style={{ height: "20px" }}
                      now={data[0].ws}
                      max={100}
                    />
                  </div>
                </div>
                <div className="summary-item">
                  <p className="summary-title">강수량</p>
                  <p className="summary-value">{data[0].rn} mm</p>
                  <div className="summary-box">
                    <ProgressBar
                      style={{ height: "20px" }}
                      now={data[0].rn}
                      max={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className="data-graph"></div>
      </div>
    </div>
  );
}

export default Main;

//import React from "react";
import React, { useState } from "react";
import Weather from "./Weather";
import Sidebar from "../Sidebar/Sidebar";
import MainChart from "./MainChart";
import "../../css/Main/Weather.css";
import "bootstrap/dist/css/bootstrap.css";
import { ProgressBar } from "react-bootstrap";
import { WiDaySunny } from "react-icons/wi";

function Main() {
  const { data, loading } = Weather();
  const [selectedWeather, setSelectedWeather] = useState(null); // 선택된 날씨 정보를 관리하는 state
  // const handleAdd = () => {
  //   const newStnId = prompt("새로운 지역의 ID를 입력하세요.");
  //   if (newStnId) {
  //     addStnId(newStnId);
  //   }
  // };
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
                <div
                  key={index}
                  className="weather-data"
                  onClick={() => setSelectedWeather(weather)}
                >
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
              {/* <div className="weather-data">
                <button onClick={handleAdd}>+</button>
              </div> */}
            </div>
            <div>
              <MainChart />
            </div>
            <div className="weather-summary">
              <h2>날씨요약</h2>
              {selectedWeather && (
                <div className="summary-container">
                  {/* 선택된 날씨 정보가 있을 때만 요약 정보 보여주기 */}
                  <div className="summary-item">
                    <p className="summary-title">습도</p>
                    <p className="summary-value">{selectedWeather.hm}%</p>
                    <div className="summary-box">
                      <ProgressBar
                        style={{ height: "20px" }}
                        now={selectedWeather.hm}
                        max={100}
                      />
                    </div>
                  </div>
                  <div className="summary-item">
                    <p className="summary-title">풍속</p>
                    <p className="summary-value">{selectedWeather.ws}%</p>
                    {/* <div className="summary-box">
                      <ProgressBar
                        style={{ height: "20px" }}
                        now={selectedWeather.ws}
                        max={100}
                      />
                    </div> */}
                  </div>
                  <div className="summary-item">
                    <p className="summary-title">강수량</p>
                    <p className="summary-value">{selectedWeather.rn}mm</p>
                    <div className="summary-box">
                      <ProgressBar
                        style={{ height: "20px" }}
                        now={selectedWeather.rn}
                        max={100}
                      />
                    </div>
                  </div>
                  {/* ... 기타 요약 정보 코드 ... */}
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Main;

import React, { useState, useEffect } from "react";
import Weather from "./Weather";
import MainChart from "./MainChart";
import "../../css/Main/Weather.css";
import "bootstrap/dist/css/bootstrap.css";
import { ProgressBar } from "react-bootstrap";
import sunny from "../../Images/sunny.gif";
function Main() {
  const { data, loading } = Weather();
  const [selectedWeather, setSelectedWeather] = useState(null); // 선택된 날씨 정보를 관리하는 state
  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedWeather(data[0]);
    }
  }, [data]);
  return (
    <div className="app">
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
                  style={
                    selectedWeather === weather
                      ? {
                          background:
                            "linear-gradient(to bottom right,  #FFFFFF,#6a9bffff 30%)",
                        }
                      : {}
                  }
                >
                  <div className="weather-top">
                    <p>{weather.stnNm}</p>
                  </div>
                  <div className="weather-middle">
                    <img
                      src={sunny}
                      alt="sunny"
                      style={{ width: 70, height: 70 }}
                    />
                  </div>
                  <div className="weather-bottom">
                    <p>기온: {weather.ta}°C</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="MainChart">
              <MainChart />
            </div>
            <div className="weather-summary">
              <h2>날씨요약</h2>
              {selectedWeather && (
                <div className="summary-container">
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
                    <p className="summary-value">{selectedWeather.ws}m/s</p>
                    <div className="summary-box">
                      <ProgressBar
                        style={{ height: "20px" }}
                        now={selectedWeather.ws}
                        max={10}
                      />
                    </div>
                  </div>
                  <div className="summary-item">
                    <p className="summary-title">이슬점</p>
                    <p className="summary-value">{selectedWeather.td}mm</p>
                    <div className="summary-box">
                      <ProgressBar
                        style={{ height: "20px" }}
                        now={selectedWeather.td}
                        max={10}
                      />
                    </div>
                  </div>
                  <div className="summary-item">
                    <p className="summary-title">지면온도</p>
                    <p className="summary-value">{selectedWeather.ts}°C</p>
                    <div className="summary-box">
                      <ProgressBar
                        style={{ height: "20px" }}
                        now={selectedWeather.ts}
                        max={10}
                      />
                    </div>
                  </div>
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

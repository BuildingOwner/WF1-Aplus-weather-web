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

  // selectedWeather를 초기화하는 부분을 수정해야 합니다.
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setSelectedWeather(data[Object.keys(data)[0]]);
    }
  }, [data]);

  return (
    <div className="app">
      <div className="main-content">
        {loading ? (
          <p>데이터 불러오는 중...</p>
        ) : Object.keys(data).length > 0 ? (
          <>
            <div className="data-container">
              {Object.keys(data).map((city) => (
                <div
                  key={city}
                  className="weather-data"
                  onClick={() => setSelectedWeather(data[city])}
                  style={
                    selectedWeather === data[city]
                      ? {
                          background:
                            "linear-gradient(to bottom right,  #FFFFFF,#6a9bffff 30%)",
                        }
                      : {}
                  }
                >
                  <div className="weather-top">
                    <p>{city}</p>
                  </div>
                  <div className="weather-middle">
                    <img
                      src={sunny}
                      alt="sunny"
                      style={{ width: 70, height: 70 }}
                    />
                  </div>
                  <div className="weather-bottom">
                    <p>기온: {data[city].TMP - 2}°C</p>
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
                    <p className="summary-value">{selectedWeather.REH}%</p>
                    <div className="summary-box">
                      <ProgressBar
                        style={{ height: "20px" }}
                        now={selectedWeather.REH}
                        max={100}
                      />
                    </div>
                  </div>
                  <div className="summary-item">
                    <p className="summary-title">풍속</p>
                    <p className="summary-value">{selectedWeather.WSD}m/s</p>
                    <div className="summary-box">
                      <ProgressBar
                        style={{ height: "20px" }}
                        now={selectedWeather.WSD}
                        max={10}
                      />
                    </div>
                  </div>
                  <div className="summary-item">
                    <p className="summary-title">강수량</p>
                    <p className="summary-value">
                      {selectedWeather.PCP}
                      {selectedWeather.PCP !== "강수없음" && "mm"}
                    </p>
                    {selectedWeather.PCP !== "강수없음" && (
                      <div className="summary-box">
                        <ProgressBar
                          style={{ height: "20px", opacity: 0.5 }} // opacity 값을 조절하시면 됩니다.
                          now={selectedWeather.PCP}
                          max={10}
                        />
                      </div>
                    )}
                  </div>

                  <div className="summary-item">
                    <p className="summary-title">하늘</p>
                    <p className="summary-value">
                      {selectedWeather.SKY <= 5
                        ? "맑음"
                        : selectedWeather.SKY <= 8
                        ? "구름많음"
                        : "흐림"}
                    </p>
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

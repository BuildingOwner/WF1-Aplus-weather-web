import React from 'react';
import Forecast from './Forecast';
import Weather from './Weather';
import Chart from './Chart';
import Chart2 from './Chart2';

const AirMain = () => {
  return (
    <div>
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
    </div>
  );
};

export default AirMain;

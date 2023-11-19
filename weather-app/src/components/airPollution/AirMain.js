import React from 'react';
import Forecast from './Forecast';
import Weather from './Weather';
import Chart from './Chart';
import Chart2 from './Chart2';
import '../../css/airPollution/airMain.css'

const AirMain = () => {
  return (
    <div style={{minWidth: 700}}>
      <div className="airmain-div">
        <h4>Weather Forecast</h4>
        <Forecast />
      </div>
      <div className="airmain-div">
        <h4>내 지역 상세</h4>
        <Weather />
      </div>
      <div className="airmain-div">
        <h4>시간대별 관측 및 예보</h4>
        <Chart />
      </div>
      <div className="airmain-div">
        <h4>주간예보</h4>
        <Chart2 />
      </div>
    </div>
  );
};

export default AirMain;

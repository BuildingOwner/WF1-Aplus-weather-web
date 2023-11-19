import React, { useState, useEffect } from 'react';
import axios from 'axios';
import convert from 'xml-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/airPollution/Weather.css'
import Stack from 'react-bootstrap/Stack';
import { Row, Col } from 'react-bootstrap'
import { serviceKey } from '../../private/key';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city] = useState("서울");
  const [selectedData, setSelectedData] = useState('dust');

  const stateColors = {
    좋음: '#32A1FF',
    보통: '#00C73C',
    나쁨: '#FD934D',
    매우나쁨: '#FF7170',
  };

  const handleDustClick = () => {
    setSelectedData('dust');
  };

  const handleOzoneClick = () => {
    setSelectedData('ozone');
  };
  useEffect(() => {
    const apiUrl = `https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst?serviceKey=${serviceKey}&returnType=%08xml&numOfRows=30&pageNo=1&sidoName=${city}&searchCondition=DAILY`;

    axios.get(apiUrl)
      .then((response) => {
        const result = convert.xml2js(response.data, { compact: true });
        const weatherItems = result.response.body.items.item;
        // 도시가 "성북구"인 항목만 필터링
        const filteredData = weatherItems.filter(item => item.cityName._text === '성북구');
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error('오염 정보 데이터 가져오기 오류:', error);
      });
  }, [city]);

  useEffect(() => {
    if (weatherData) {
      console.log('Weather Data:', weatherData);
    }
  }, [weatherData]);

  return (
    <>
      {weatherData && (
        <div className="weather-bordered-div">
          <h5>{city}</h5>
          <Row>
            <Col>
              <div className="btn-group w-100" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked onClick={handleDustClick} />
                <label className="btn btn-outline-primary w-50" htmlFor="btnradio1">미세먼지·초미세먼지</label>

                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={handleOzoneClick} />
                <label className="btn btn-outline-primary w-50" htmlFor="btnradio2">황사·오존</label>
              </div>
            </Col>
          </Row>

          {weatherData.map((item, index) => {
            let state1, value1, label1;
            let state2, value2, label2;
            let unit;
            if (selectedData === 'dust') {
              // 미세먼지와 초미세먼지의 값을 출력
              const pm10Value = Number(item.pm10Value._text);
              const pm25Value = Number(item.pm25Value._text);
              unit = '㎍/㎥';
              // 미세먼지(pm10) 상태값 계산
              if (pm10Value <= 30) {
                state1 = '좋음';
              } else if (pm10Value <= 80) {
                state1 = '보통';
              } else if (pm10Value <= 150) {
                state1 = '나쁨';
              } else {
                state1 = '매우 나쁨';
              }
              value1 = item.pm10Value._text;
              label1 = '미세먼지';

              // 초미세먼지(pm25) 상태값 계산
              if (pm25Value <= 15) {
                state2 = '좋음';
              } else if (pm25Value <= 35) {
                state2 = '보통';
              } else if (pm25Value <= 75) {
                state2 = '나쁨';
              } else {
                state2 = '매우 나쁨';
              }
              value2 = item.pm25Value._text;
              label2 = '초미세먼지';
            } else {
              // 황사와 오존의 값을 출력
              const khaiValue = Number(item.khaiValue._text);
              const o3Value = Number(item.o3Value._text);
              unit = 'ppm';

              if (khaiValue <= 50) {
                state1 = '좋음';
              } else if (khaiValue <= 100) {
                state1 = '보통';
              } else if (khaiValue <= 250) {
                state1 = '나쁨';
              } else {
                state1 = '매우 나쁨';
              }
              value1 = item.khaiValue._text;
              label1 = '황사';

              if (o3Value <= 0.03) {
                state2 = '좋음';
              } else if (o3Value <= 0.09) {
                state2 = '보통';
              } else if (o3Value <= 0.15) {
                state2 = '나쁨';
              } else {
                state2 = '매우 나쁨';
              }
              value2 = item.o3Value._text;
              label2 = '오존';
            }

            return (
              <React.Fragment key={index}>
                <Row>
                  <Col xs={6}>
                    <div key={index} className="circle-group">
                      <div className="circle-container">
                        <div className="circle" style={{ borderColor: stateColors[state1] }}>
                          <p>{state1}</p>
                          <p>{value1}</p>
                          <p>{unit}</p>
                        </div>
                        <p>{label1}</p>
                      </div>
                      <div className="circle-container">
                        <div className="circle" style={{ borderColor: stateColors[state2] }}>
                          <p>{state2}</p>
                          <p>{value2}</p>
                          <p>{unit}</p>
                        </div>
                        <p>{label2}</p>
                      </div>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className='grades'>
                      <Col xs={6}>
                        <div className='us'>
                          <h5>US.AQI</h5>
                          <Stack direction="vertical" gap={2}>
                            <div className='badge-group'>
                              <div className="custom-badge" style={{ backgroundColor: stateColors[state1] }}>{value1}</div>
                              <div className='badge-group-text-container'>
                                <div className="badge-text"> {label1}</div>
                                <div className='st' style={{ color: stateColors[state1] }}>{state1}</div>
                              </div>
                            </div>
                            <div className='badge-group'>
                              <div className="custom-badge" style={{ backgroundColor: stateColors[state2] }}>{value2}</div>
                              <div className='badge-group-text-container'>
                                <div className="badge-text"> {label2}</div>
                                <div className='st' style={{ color: stateColors[state2] }}>{state2}</div>
                              </div>
                            </div>
                          </Stack>

                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className='who'>
                          <h5>WHO</h5>
                          <Stack direction="vertical" gap={2}>
                            <div className='badge-group'>
                              <div className="custom-badge" style={{ backgroundColor: stateColors[state1] }}>{value1}</div>
                              <div className='badge-group-text-container'>
                                <div className="badge-text"> {label1}</div>
                                <div className='st' style={{ color: stateColors[state1] }}>{state1}</div>
                              </div>
                            </div>
                            <div className='badge-group'>
                              <div className="custom-badge" style={{ backgroundColor: stateColors[state2] }}>{value2}</div>
                              <div className='badge-group-text-container'>
                                <div className="badge-text"> {label2}</div>
                                <div className='st' style={{ color: stateColors[state2] }}>{state2}</div>
                              </div>
                            </div>
                          </Stack>
                        </div>
                      </Col>
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </>
  );
};
export default Weather;


// 측정소별 실시간 일평균 정보 조회

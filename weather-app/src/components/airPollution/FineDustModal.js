// FineDustModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { fetchData } from './api2.js'; // API 호출 로직 import
import cities from './cities';
import '../../css/Modal.css'

const FineDustModal = ({ show, handleClose }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let fetchedData;

      // 로컬 스토리지에서 데이터를 불러옵니다.
      const localStorageData = localStorage.getItem('data');
      console.log(localStorageData);

      if (localStorageData) { // 로컬 스토리지에 데이터가 있는 경우
        fetchedData = JSON.parse(localStorageData);
      } else { // 로컬 스토리지에 데이터가 없는 경우
        fetchedData = await fetchData();
        localStorage.setItem('data', JSON.stringify(fetchedData)); // 데이터를 로컬 스토리지에 저장
      }

      setData(fetchedData);
    };

    getData();
  }, []);

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="custom-dialog" aria-labelledby="example-custom-modal-styling-title">
      <Modal.Header closeButton>
        <Modal.Title>전국 미세먼지</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container-modal'>
          <div className='map-container'>
            {cities.map((city, index) => (
              <div className="circleMap" style={{ top: city.top, left: city.left }} key={index}>
                {data[index] && data[index].sidoName && data[index].pm10Value ? (
                  <>
                    <div className='city-name'>{data[index].sidoName[0]}</div>
                    <div className='index'
                    style={{ 
                      backgroundColor: 
                        data[index].pm10Value[0] <= 30 ? '#32A1FF' : 
                        data[index].pm10Value[0] <= 80 ? '#7ACF17' : 
                        data[index].pm10Value[0] <= 150 ? '#FD934C' : 
                        '#FF7170'
                    }}
                    >{data[index].pm10Value[0]}</div>
                  </>
                ) : (
                  <div>데이터 로딩중...</div>
                )}
              </div>
            ))}
          </div>
          <div className='behavior'>
            <h5>범례 및 행동요령</h5>
            <div className='textbox'>
              <div className='titlebox' style={{ backgroundColor: '#FF7170' }}>매우나쁨 (151㎛/㎥~)</div>{'미세먼지가 매우 짙으니 절대 외출을 삼가세요\n부득이한 외출 시 황사용 마스크를 꼭 착용하세요\n눈이나 호흡기에 통증이 있을 경우 외출을 절대 삼가고, 장기간 렌즈 착용은 피하세요\n외부 공기의 유입을 최소화하고 교통량이 많은 지역으로의 이동을 피하세요'}</div>
            <div className='textbox'><div className='titlebox' style={{ backgroundColor: '#FD934C' }}>나쁨 (81~150㎛/㎥)</div>{'공기가 탁하니 가급적 외출을 자제하세요\n외출 시 마스크나 손수건을 챙겨주세요\n노약자, 호흡기 질환자는 실외활동을 자제하세요\n미세먼지 마스크는 피부에 밀착시켜 착용하세요'}</div>
            <div className='textbox'><div className='titlebox' style={{ backgroundColor: '#7ACF17' }}>보통 (31~80㎛/㎥)</div>{'실내 환기를 해보세요\n장시간 야외활동에 문제 없어요\n바깥 활동에 지장 없어요'}</div>
            <div className='textbox'><div className='titlebox' style={{ backgroundColor: '#32A1FF' }}>좋음 (0~30㎛/㎥)</div>{'야외활동하기 좋은 하루예요\n마스크 걱정 없이 외출하세요'}</div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FineDustModal;
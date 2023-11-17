// OzoneModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { fetchData } from './api2.js'; // API 호출 로직 import
import cities from './cities';
import '../../css/airPollution/Modal.css'

const OzoneModal = ({ show, handleClose }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let fetchedData;

      // 로컬 스토리지에서 데이터를 불러옵니다.
      const localStorageData = localStorage.getItem('data');

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
        <Modal.Title>전국 오존</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container-modal'>
          <div className='map-container'>
            {cities.map((city, index) => (
              <div className="circleMap" style={{ top: city.top, left: city.left }} key={index}>
                {data[index] && data[index].sidoName && data[index].o3Value ? (
                  <>
                    <div className='city-name'>{data[index].sidoName[0]}</div>
                    <div className='index' style={{
                      backgroundColor:
                        data[index].o3Value[0] <= 50 ? '#32A1FF' :
                          data[index].o3Value[0] <= 100 ? '#7ACF17' :
                            data[index].o3Value[0] <= 250 ? '#FD934C' :
                              '#FF7170'
                    }}>{data[index].o3Value[0]}</div>
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
              <div className='titlebox' style={{ backgroundColor: '#FF7170' }}>매우나쁨 (0.151ppm~)</div>{'가급적 외출을 자제해주시고, 외출 시에는 보호 안경·선블록·긴 소매 의복 등을 꼭 챙겨주세요\n기온이 높고 자외선도 많은 아스팔트 위는 가급적 피해주세요\n되도록 실외에서의 활동을 제한하고, 외부의 공기와 접촉을 가능한 적게 해주세요\n실외 환기는 자제해주시고, 가습기를 사용하여 실내 습도 조절에 신경 써 주세요\n피부 노화 방지에 좋은 물과 견과류, 채소 등을 충분히 섭취해 주세요\n스프레이 등 화학제품 사용을 자제해주세요'}</div>
            <div className='textbox'><div className='titlebox' style={{ backgroundColor: '#FD934C' }}>나쁨 (0.091~0.15ppm)</div>{'장시간 외출 및 과격한 운동은 자제해주세요\n어린이·노인·호흡기 질환자·심장질환자 등은 가급적 외출을 자제해주세요\n되도록 차량 운행을 자제해 주시고, 대중교통을 이용 해주세요'}</div>
            <div className='textbox'><div className='titlebox' style={{ backgroundColor: '#7ACF17' }}>보통 (0.031~0.09ppm)</div>{'실내 환기를 해보세요\n장시간 야외활동에 문제 없어요\n바깥 활동에 지장 없어요'}</div>
            <div className='textbox'><div className='titlebox' style={{ backgroundColor: '#32A1FF' }}>좋음 (0~0.03ppm)</div>{'야외활동하기 좋은 하루예요\n마스크 걱정 없이 외출하세요'}</div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OzoneModal;



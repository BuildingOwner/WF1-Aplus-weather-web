// SulfurModal.js
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { fetchData } from "./api2.js"; // API 호출 로직 import
import cities from "./cities";
import "../../css/airPollution/Modal.css";

const SulfurModal = ({ show, handleClose }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let fetchedData;

      // 로컬 스토리지에서 데이터를 불러옵니다.
      const localStorageData = localStorage.getItem("data");
      // console.log(localStorageData);

      if (localStorageData) {
        // 로컬 스토리지에 데이터가 있는 경우
        fetchedData = JSON.parse(localStorageData);
      } else {
        // 로컬 스토리지에 데이터가 없는 경우
        fetchedData = await fetchData();
        localStorage.setItem("data", JSON.stringify(fetchedData)); // 데이터를 로컬 스토리지에 저장
      }

      setData(fetchedData);
    };

    getData();
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="custom-dialog"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title>전국 황사</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-modal">
          <div className="map-container">
            {cities.map((city, index) => (
              <div
                className="circleMap"
                style={{ top: city.top, left: city.left }}
                key={index}
              >
                {data[index] &&
                data[index].sidoName &&
                data[index].khaiValue ? (
                  <>
                    <div className="city-name">{data[index].sidoName[0]}</div>
                    <div
                      className="index"
                      style={{
                        backgroundColor:
                          data[index].khaiValue[0] <= 50
                            ? "#32A1FF"
                            : data[index].khaiValue[0] <= 100
                            ? "#7ACF17"
                            : data[index].khaiValue[0] <= 250
                            ? "#FD934C"
                            : "#FF7170",
                      }}
                    >
                      {data[index].khaiValue[0]}
                    </div>
                  </>
                ) : (
                  <div>데이터 로딩중...</div>
                )}
              </div>
            ))}
          </div>
          <div className="behavior">
            <h5>범례 및 행동요령</h5>
            <div className="textbox">
              <div className="titlebox" style={{ backgroundColor: "#FF7170" }}>
                매우나쁨 (251~)
              </div>
              {
                "가급적 외출을 자제해주시고, 외출 시에는 보호 안경·황사용 마스크·긴 소매 의복 등을 꼭 챙겨주세요\n실외 환기는 자제해주시고, 공기 정화기와 가습기를 사용하여 실내 공기 정화에 신경 써 주세요\n되도록 실외에서의 활동을 제한하고, 외부의 공기와 접촉을 가능한 적게 해주세요\n노폐물 배출 효과가 있는 물과 과일, 야채 등을 충분히 섭취 해주세요"
              }
            </div>
            <div className="textbox">
              <div className="titlebox" style={{ backgroundColor: "#FD934C" }}>
                나쁨 (101~250)
              </div>
              {
                "장시간 외출을 자제해주시고, 외출 시에는 보호 안경·황사용 마스크·긴 소매 의복 등을 챙겨주세요\n황사가 들어오지 못하도록 창문을 닫고, 공기 정화기와 가습기를 사용하여 실내 공기 정화에 신경 써 주세요\n황사에 노출된 채소, 과일, 생선 등 농수산물은 충분히 세척 후 요리하세요\n외출 후에는 호흡기 및 손과 발을 깨끗이 하고, 주변 환경을 청결히 해주세요"
              }
            </div>
            <div className="textbox">
              <div className="titlebox" style={{ backgroundColor: "#7ACF17" }}>
                보통 (51~100)
              </div>
              {
                "황사가 실내로 들어오지 못하도록 창문 등을 점검해주세요\n실내 공기 정화기, 가습기 등을 미리 점검 및 준비해주세요\n외출하기에 무난하지만, 어린이·노인·호흡기 질환자 등은 호흡기 건강관리에 유의해주세요"
              }
            </div>
            <div className="textbox">
              <div className="titlebox" style={{ backgroundColor: "#32A1FF" }}>
                좋음 (0~50)
              </div>
              {"야외활동하기 좋은 하루예요\n마스크 걱정 없이 외출하세요"}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SulfurModal;

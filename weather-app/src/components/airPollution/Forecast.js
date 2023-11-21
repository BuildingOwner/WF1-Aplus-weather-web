import React, { useState } from 'react';
import '../../css/airPollution/Forecast.css'
import AirQualityModal from './AirQualityModal';
import FineDustModal from './FineDustModal';
import UltraFineDustModal from './UltraFineDustModal';
import SulfurModal from './SulfurModal';
import OzoneModal from './OzoneModal';

const Forecast = () => {
  const [showModal, setShowModal] = useState({});

  const handleClose = () => setShowModal({});
  const handleShow = (modal) => setShowModal({ [modal]: true });

  return (
    <div className="forecast-container">
      <button className="btns btn-1" onClick={() => handleShow('AirQuality')}>통합대기</button>
      <button className="btns btn-2" onClick={() => handleShow('FineDust')}>미세먼지</button>
      <button className="btns btn-3" onClick={() => handleShow('UltraFineDust')}>초미세먼지</button>
      <button className="btns btn-4" onClick={() => handleShow('Sulfur')}>황사</button>
      <button className="btns btn-5" onClick={() => handleShow('Ozone')}>오존</button>

      <AirQualityModal show={showModal['AirQuality']} handleClose={handleClose} />
      <FineDustModal show={showModal['FineDust']} handleClose={handleClose} />
      <UltraFineDustModal show={showModal['UltraFineDust']} handleClose={handleClose} />
      <SulfurModal show={showModal['Sulfur']} handleClose={handleClose} />
      <OzoneModal show={showModal['Ozone']} handleClose={handleClose} />
    </div>
  );
};

export default Forecast

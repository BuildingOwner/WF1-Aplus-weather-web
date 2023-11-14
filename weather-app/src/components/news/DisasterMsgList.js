import "../../css/news/Animation.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisasterMsgKey from "../../private/DisasterMsgKey";


const DisasterMsgList= ()=> {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const key = DisasterMsgKey;
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://apis.data.go.kr/1741000/DisasterMsg3/getDisasterMsg1List?serviceKey=${key}&pageNo=1&numOfRows=10&type=json`);
        setData(response.data.DisasterMsg[1].row);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % data.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, data]);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % data.length);
  };

  return (
    <div className="slider">
      {data.map((item, index) => (
        <div className={index === currentIndex ? 'slide activeSlide' : 'slide'} key={index}>
          <p>{item.create_date}</p>
          <p>{item.msg}</p>
        </div>
      ))};
      <div className="arrowButtonDiv">
        <button className="arrow arrow-left" onClick={prevSlide}>◀</button>
        <button className="arrow arrow-right" onClick={nextSlide}>▶</button>
      </div>
    </div>
  );
}

export default DisasterMsgList;

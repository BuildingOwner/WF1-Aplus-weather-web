import React, { useState, useEffect } from "react";
import axios from "axios";
import serviceKey from "../../private/serviceKey";

function Weather() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const locations = [
    { name: "서울", nx: "60", ny: "127" },
    { name: "인천", nx: "55", ny: "124" },
    { name: "대구", nx: "89", ny: "90" },
    { name: "수원", nx: "60", ny: "121" },
    { name: "부산", nx: "98", ny: "76" },
  ];

  const fetchData = async (location) => {
    setLoading(true);
    const now = new Date();
    if (now.getMinutes() < 30) {
      now.setHours(now.getHours() - 1);
    }
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 주의: getMonth()는 0부터 시작합니다.
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours() - 2).padStart(2, "0");
    const apiUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&numOfRows=1000&pageNo=1&base_date=${year}${month}${day}&base_time=${hour}30&nx=${location.nx}&ny=${location.ny}`;

    try {
      const response = await axios.get(apiUrl);
      console.log("API 응답:", response.data); // API 응답 출력
      const xmlDoc = new DOMParser().parseFromString(response.data, "text/xml");
      const items = xmlDoc.querySelectorAll("item");

      let newData = { TMP: null, REH: null, WSD: null, PCP: null, SKY: null };
      items.forEach((item) => {
        const categoryEl = item.querySelector("category");
        const fcstValueEl = item.querySelector("fcstValue");
        if (categoryEl && fcstValueEl) {
          const category = categoryEl.textContent;
          if (
            category === "TMP" ||
            category === "REH" ||
            category === "WSD" ||
            category === "PCP" ||
            category === "SKY"
          ) {
            newData[category] = fcstValueEl.textContent;
            console.log(`[${location.name}] ${category}: ${newData[category]}`); // 카테고리 값 출력
          }
        }
      });

      setData((prevData) => {
        const updatedData = { ...prevData, [location.name]: newData };
        // console.log(updatedData);
        return updatedData;
      });
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    locations.forEach(fetchData);
  }, []);

  return { data, loading };
}

export default Weather;

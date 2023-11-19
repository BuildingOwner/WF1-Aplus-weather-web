import React, { useState, useEffect } from "react";
import axios from "axios";
import serviceKey from "../../private/serviceKey";
function Weather() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth()).padStart(2, "0");
    const day = String(now.getDate() - 1).padStart(2, "0");
    const stnIds = ["108", "112", "143", "119", "159"]; // 원하는 지역의 ID를 배열로 설정하세요.
    const requests = stnIds.map((stnId) => {
      const apiUrl = `http://apis.data.go.kr/1360000/AsosHourlyInfoService/getWthrDataList?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&dataCd=ASOS&dateCd=HR&stnIds=${stnId}&endDt=${year}${month}${day}&endHh=01&startHh=01&startDt=${year}${month}${day}`;
      return axios.get(apiUrl);
    });

    try {
      const responses = await Promise.all(requests);

      const data = responses.map((response) => {
        const xmlDoc = new DOMParser().parseFromString(
          response.data,
          "text/xml"
        );
        return {
          stnNm: xmlDoc.querySelector("stnNm").textContent,
          ta: xmlDoc.querySelector("ta").textContent,
          hm: xmlDoc.querySelector("hm").textContent,
          ws: xmlDoc.querySelector("ws").textContent,
          td: xmlDoc.querySelector("td").textContent,
          ts: xmlDoc.querySelector("ts").textContent,
        };
      });

      setData(data);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
}

export default Weather;

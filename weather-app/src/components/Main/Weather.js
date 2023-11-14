import React, { useState, useEffect } from "react";
import axios from "axios";
import serviceKey from "../../private/serviceKey";
function Weather() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [stnIds, setStnIds] = useState(["108", "112", "143"]); // stnIds를 state로 관리합니다.
  //const [newStnId, setNewStnId] = useState(""); // 사용자가 입력하는 새 지역의 ID를 관리하는 state를 추가합니다.
  // const areaData = {
  //   속초: "90",
  //   북춘천: "93",
  //   철원: "95",
  //   // 나머지 지역 데이터도 이와 같이 추가합니다.
  // };
  const fetchData = async () => {
    setLoading(true);

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate() - 1).padStart(2, "0");
    const stnIds = ["108", "112", "143"]; // 원하는 지역의 ID를 배열로 설정하세요.
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
        // const wsValue = xmlDoc.querySelector("ws").textContent;
        // console.log("ws value: ", wsValue); // ws 값을 콘솔에 출력합니다.
        // const rnValue = xmlDoc.querySelector("rn").textContent;
        // console.log("rn value: ", rnValue); // rn 값을 콘솔에 출력합니다.
        return {
          stnNm: xmlDoc.querySelector("stnNm").textContent,
          ta: xmlDoc.querySelector("ta").textContent,
          hm: xmlDoc.querySelector("hm").textContent,
          ws: xmlDoc.querySelector("ws").textContent,
          rn: xmlDoc.querySelector("rn").textContent,
          // ws: wsValue,
          // rn: rnValue,
        };
      });

      setData(data);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
    } finally {
      setLoading(false);
    }
  };
  // const addStnId = (newStnName) => {
  //   if (areaData[newStnName]) {
  //     setStnIds([...stnIds, areaData[newStnName]]);
  //   } else {
  //     alert("입력한 지역의 데이터를 찾을 수 없습니다.");
  //   }
  // };
  useEffect(() => {
    fetchData();
  }, []); // stnIds가 변경될 때마다 fetchData를 호출합니다.

  return { data, loading }; // 입력 필드와 버튼에서 사용할 수 있도록 관련 state와 함수를 반환합니다.
}

export default Weather;

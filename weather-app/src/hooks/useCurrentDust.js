import WEEK_API_KYE from "../private/key";
import axios from "axios";
import { useState, useEffect } from "react";

const city = {
  "대구": "daegu",
  "충남": "chungnam",
  "인천": "incheon",
  "대전": "daejeon",
  "경북": "gyeongbuk",
  "세종": "sejong",
  "광주": "gwangju",
  "전북": "jeonbuk",
  "강원": "gangwon",
  "울산": "ulsan",
  "전남": "jeonnam",
  "서울": "seoul",
  "부산": "busan",
  "제주": "jeju",
  "충북": "chungbuk",
  "경남": "gyeongnam",
  "경기": "gyeonggi",
}

const useCurrentDust = (location) => {
  const [pm10, setPm10] = useState();
  const [pm25, setPm25] = useState();
  const [o3, setO3] = useState();
  const [so2, setSo2] = useState();

  const content = ['PM10','PM25','O3','SO2']

  const url =
    "http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst"; /*URL*/
  let queryParams =
    "?" + encodeURIComponent("serviceKey") + "=" + WEEK_API_KYE; /*Service Key*/
  queryParams +=
    "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("1"); /**/
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("returnType") +
    "=" +
    encodeURIComponent("json"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("dataGubun") +
    "=" +
    encodeURIComponent("HOUR"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("dataGubun") +
    "=" +
    encodeURIComponent("WEEK"); /**/

  useEffect(() => {
    const fetchData = async () => {
      try {
        let results = []
        for(let i=0; i<content.length; i++){
          let result = await axios.get(url + queryParams + "&" + encodeURIComponent("itemCode") + "=" + encodeURIComponent(content[i]));
          results.push(result.data.response.body.items[0][`${city[location]}`])
        }
        setPm10(results[0])
        setPm25(results[1])
        setO3(results[2])
        setSo2(results[3])
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    fetchData();
  }, [location]);

  return {pm10: pm10, pm25: pm25, o3: o3, so2:so2};
};

export default useCurrentDust;

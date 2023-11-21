import WEEK_API_KYE from "../private/key";
import axios from "axios";
import { useState, useEffect } from "react";

const useTodayWeather = (location) => {
  const [sky, setSky] = useState([]);
  const [temps, setTemps] = useState([]);
  const [rains, setRains] = useState([]);
  const [todayTemp, setTodayTemp] = useState([]);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  let day = String(now.getDate()).padStart(2, "0");
  const hour = now.getHours();
  if (hour < 6) {
    day = String(now.getDate() - 1).padStart(2, "0");
  }
  const time = [2, 5, 8, 11, 14, 17, 20, 23];
  const minute = String(now.getMinutes()).padStart(2, "0");
  let currentHour = now.getHours();
  let closest = time.reduce((prev, curr) =>
    Math.abs(curr - currentHour) < Math.abs(prev - currentHour) ? curr : prev
  );
  const hours = String(closest).padStart(2, "0");

  const currentTime = hours + minute;
  const formattedDate = `${year}${month}${day}`;

  const url =
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"; /*URL*/
  let queryParams =
    "?" + encodeURIComponent("serviceKey") + "=" + WEEK_API_KYE; /*Service Key*/
  queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent("120"); /**/
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("dataType") +
    "=" +
    encodeURIComponent("JSON"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("base_date") +
    "=" +
    encodeURIComponent(formattedDate); /**/
  queryParams +=
    "&" +
    encodeURIComponent("base_time") +
    "=" +
    encodeURIComponent(currentTime); /**/
  queryParams +=
    "&" + encodeURIComponent("nx") + "=" + encodeURIComponent("60"); /**/
  queryParams +=
    "&" + encodeURIComponent("ny") + "=" + encodeURIComponent("127"); /**/

  let queryParamsMinTemp =
    "?" + encodeURIComponent("serviceKey") + "=" + WEEK_API_KYE; /*Service Key*/
  queryParamsMinTemp +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent("120"); /**/
  queryParamsMinTemp +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
  queryParamsMinTemp +=
    "&" +
    encodeURIComponent("dataType") +
    "=" +
    encodeURIComponent("JSON"); /**/
  if (hour < 2) {
    day = String(now.getDate() - 1).padStart(2, "0");
  }
  const minTempDate = `${year}${month}${day}`;
  queryParamsMinTemp +=
    "&" +
    encodeURIComponent("base_date") +
    "=" +
    encodeURIComponent(minTempDate); /**/
  queryParamsMinTemp +=
    "&" +
    encodeURIComponent("base_time") +
    "=" +
    encodeURIComponent("0220"); /**/
  queryParamsMinTemp +=
    "&" + encodeURIComponent("nx") + "=" + encodeURIComponent("55"); /**/
  queryParamsMinTemp +=
    "&" + encodeURIComponent("ny") + "=" + encodeURIComponent("127"); /**/

  let queryParamsMaxTemp =
    "?" + encodeURIComponent("serviceKey") + "=" + WEEK_API_KYE; /*Service Key*/
  queryParamsMaxTemp +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent("120"); /**/
  queryParamsMaxTemp +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
  queryParamsMaxTemp +=
    "&" +
    encodeURIComponent("dataType") +
    "=" +
    encodeURIComponent("JSON"); /**/
  if (hour < 8) {
    day = String(now.getDate() - 1).padStart(2, "0");
  }
  const maxTempDate = `${year}${month}${day}`;
  queryParamsMaxTemp +=
    "&" +
    encodeURIComponent("base_date") +
    "=" +
    encodeURIComponent(maxTempDate); /**/
  queryParamsMaxTemp +=
    "&" +
    encodeURIComponent("base_time") +
    "=" +
    encodeURIComponent("0820"); /**/
  queryParamsMaxTemp +=
    "&" + encodeURIComponent("nx") + "=" + encodeURIComponent("55"); /**/
  queryParamsMaxTemp +=
    "&" + encodeURIComponent("ny") + "=" + encodeURIComponent("127"); /**/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(url + queryParams);
        const resultMinTemp = await axios.get(url + queryParamsMinTemp);
        const resultMaxTemp = await axios.get(url + queryParamsMaxTemp);

        let filteredData = result.data.response.body.items.item.filter(
          (item) => item.category === "TMP"
        );
        let tempArr = filteredData.map((item) => item.fcstValue);
        setTemps(tempArr);

        filteredData = result.data.response.body.items.item.filter(
          (item) => item.category === "POP"
        );
        let rainArr = filteredData.map((item) => item.fcstValue);
        setRains(rainArr);

        filteredData = result.data.response.body.items.item.filter(
          (item) => item.category === "SKY"
        );
        let skyArr = filteredData.map((item) => item.fcstValue);
        setSky(skyArr);

        filteredData = resultMinTemp.data.response.body.items.item.filter(
          (item) => item.category === "TMN"
        );
        let todayTempMinArr = filteredData.map((item) => item.fcstValue);

        filteredData = resultMaxTemp.data.response.body.items.item.filter(
          (item) => item.category === "TMX"
        );
        let todayTempMaxArr = filteredData.map((item) => item.fcstValue);

        setTodayTemp({ min: todayTempMinArr[0], max: todayTempMaxArr[0] });
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    fetchData();
  }, [location]);

  return { skys: sky, temps: temps, rains: rains, todayTemp: todayTemp };
};
export default useTodayWeather;

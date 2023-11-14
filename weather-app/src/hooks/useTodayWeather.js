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
  const hours = String(now.getHours()-2).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const currentTime = hours + minute;
  const formattedDate = `${year}${month}${day}`;

  // let latitude = 0;
  // let longitude = 0;
  // navigator.geolocation.getCurrentPosition(function (position) {
  //   latitude = position.coords.latitude;
  //   longitude = position.coords.longitude;
  // });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(url + queryParams);
        console.log(result)

        let filteredData = result.data.response.body.items.item.filter(
          (item) => item.category === "TMP"
        );
        let tempArr = filteredData.map((item) => item.fcstValue);
        setTemps(tempArr)

        filteredData = result.data.response.body.items.item.filter(
          (item) => item.category === "POP"
        );
        let rainArr = filteredData.map((item) => item.fcstValue);
        setRains(rainArr)

        filteredData = result.data.response.body.items.item.filter(
          (item) => item.category === "SKY"
        );
        let skyArr = filteredData.map((item) => item.fcstValue);
        setSky(skyArr)

        // filteredData = result.data.response.body.items.item.filter(
        //   (item) => item.category === "TMN"
        // );
        // let todayTempMinArr = filteredData.map((item) => item.fcstValue);

        // filteredData = result.data.response.body.items.item.filter(
        //   (item) => item.category === "TMX"
        // );
        // let todayTempMaxArr = filteredData.map((item) => item.fcstValue);

        // setTodayTemp({min: todayTempMinArr[0], max: todayTempMaxArr[0]})
        
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    fetchData();
  }, [location]);

  return { skys: sky, temps: temps, rains: rains, baseTime: hours, todayTemp: todayTemp};
};
export default useTodayWeather;

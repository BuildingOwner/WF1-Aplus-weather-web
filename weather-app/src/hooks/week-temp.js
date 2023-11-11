import WEEK_API_KYE from "../private/key";
import axios from "axios";
import { useState, useEffect } from "react";

export const useWeekTemp = (location) => {
  const [temps, setWeather] = useState([]);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  let day = String(now.getDate()).padStart(2, "0");
  const hour = now.getHours();
  if (hour < 6) {
    day = String(now.getDate() - 1).padStart(2, "0");
  }
  const formattedDate = `${year}${month}${day}`;

  const url =
    "http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa"; /*URL*/
  let queryParams =
    "?" + encodeURIComponent("serviceKey") + "=" + WEEK_API_KYE; /*Service Key*/
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
  queryParams +=
    "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("dataType") +
    "=" +
    encodeURIComponent("JSON"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("regId") +
    "=" +
    encodeURIComponent("11B10101"); /**/
  queryParams +=
    "&" +
    encodeURIComponent("tmFc") +
    "=" +
    encodeURIComponent(formattedDate + "0600"); /**/

  useEffect(() => {
    axios
      .get(url + queryParams)
      .then((result) => {
        let temp = [];
        for (let i = 0; i < 8; i++) {
          const maxKey = `taMax${i + 3}`;
          const minKey = `taMin${i + 3}`;
          const max = result.data.response.body.items.item[0][maxKey];
          const min = result.data.response.body.items.item[0][minKey];

          temp.push({ max: max, min: min });
        }

        setWeather(temp);
      })
      .catch((error) => console.log("에러 " + error));
  }, [location]);

  return { temps };
};

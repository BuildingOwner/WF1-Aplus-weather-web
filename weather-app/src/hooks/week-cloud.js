// week-cloud.js
import WEEK_API_KYE from "../private/key";
import axios from "axios";
import { useState, useEffect } from "react";

export const useWeekCloud = (location) => {
  const [rainRate, setRainRate] = useState([]);
  const [cloud, setCloud] = useState([]);

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
    "http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst"; /*URL*/
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
    encodeURIComponent(location); /**/
  queryParams +=
    "&" +
    encodeURIComponent("tmFc") +
    "=" +
    encodeURIComponent(formattedDate + "0600"); /**/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(url + queryParams);
        let rain = [];
        let cloudy = [];

        for (let i = 0; i < 5; i++) {
          const rainAmKey = `rnSt${i + 3}Am`;
          const rainPmKey = `rnSt${i + 3}Pm`;
          const ram = result.data.response.body.items.item[0][rainAmKey];
          const rpm = result.data.response.body.items.item[0][rainPmKey];
          rain.push({ am: ram, pm: rpm });

          const cloudAmKey = `wf${i + 3}Am`;
          const cloudPmKey = `wf${i + 3}Pm`;
          const cam = result.data.response.body.items.item[0][cloudAmKey];
          const cpm = result.data.response.body.items.item[0][cloudPmKey];
          cloudy.push({ am: cam, pm: cpm });
        }

        for (let i = 0; i < 3; i++) {
          const rainAmKey = `rnSt${i + 8}`;
          const ra = result.data.response.body.items.item[0][rainAmKey];
          rain.push({ rain: ra });

          const cloudAmKey = `wf${i + 8}`;
          const cloud = result.data.response.body.items.item[0][cloudAmKey];
          cloudy.push({ cloud: cloud });
        }
        setRainRate(rain);
        setCloud(cloudy);
      } catch (error) {
        console.log(error);
        return null
      }
    };
    fetchData();
  }, [location]);

  return { rainRate: rainRate, cloud: cloud };
};


import React, { useState, useEffect } from "react";
import axios from "axios";
import convert from "xml-js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { serviceKey } from "../../private/key"; // 실제 서비스 키로 대체해야 합니다.

const MainChart = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [minMax, setMinMax] = useState([0, 0]);

  useEffect(() => {
    const fetchForecast = async (baseTime) => {
      const forecastTime = new Date();
      forecastTime.setDate(forecastTime.getDate() - 1);
      const base_date = forecastTime
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      const base_time = baseTime;
      // const roundedHour = Math.floor(forecastTime.getHours() / 3) * 3;
      // const base_time = (roundedHour < 10 ? "0" : "") + roundedHour + "00";
      const apiUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${serviceKey}&numOfRows=1000&pageNo=1&base_date=${base_date}&base_time=${base_time}&nx=55&ny=127`;

      const response = await axios.get(apiUrl);
      const result = convert.xml2js(response.data, { compact: true });
      if (
        !result ||
        !result.response ||
        !result.response.body ||
        !result.response.body.items
      ) {
        // console.error("Invalid API response: ", result);
        return [];
      }
      let forecastItems = result.response.body.items.item;
      if (!Array.isArray(forecastItems)) {
        forecastItems = [forecastItems];
      }
      // console.log(forecastItems);
      const weatherData = (forecastItems || [])
        .filter(
          (item) => item && item.category && item.category._text === "T1H"
        )
        .map((item) => {
          return {
            date: item.baseDate._text,
            time: item.baseTime._text,
            category: item.category._text,
            value: item.obsrValue._text,
          };
        });

      return weatherData;
    };

    const fetchAllForecasts = async () => {
      const baseTimeList = [
        "0700",
        "0800",
        "0900",
        "1000",
        "1100",
        "1200",
        "1300",
        "1400",
        "1500",
        "1600",
        "1700",
        "1800",
        "1900",
        "2000",
        "2100",
        "2200",
        "2300",
        "2400",
      ]; // 원하는 시간 리스트 생성

      const allWeatherData = [];
      for (const baseTime of baseTimeList) {
        const data = await fetchForecast(baseTime); // baseTime 값을 제공
        allWeatherData.push(...data);
      }
      setWeatherData(allWeatherData);
    };

    fetchAllForecasts();
  }, []);

  useEffect(() => {
    const min = Math.min(
      ...weatherData.map((item) => parseInt(item.value, 10))
    );
    const max =
      Math.max(...weatherData.map((item) => parseInt(item.value, 10))) + 1;
    setMinMax([min, max]);
  }, [weatherData]);

  const createTicks = (minMax) => {
    const ticks = [];
    for (let i = minMax[0]; i <= minMax[1]; i++) {
      ticks.push(i);
    }
    return ticks;
  };

  // const sortedData = weatherData.sort((a, b) => a.time - b.time);
  const sortedData = weatherData
    .sort((a, b) => a.time - b.time)
    .filter((item) => item.time !== "0000"); // 00:00시의 데이터 제외

  return (
    <ResponsiveContainer width="97%" height={300}>
      <BarChart
        data={sortedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={minMax} ticks={createTicks(minMax)} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" name="예보값" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MainChart;

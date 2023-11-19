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

  useEffect(() => {
    const now = new Date();
    now.setMinutes(0, 0, 0); // 현재 시간의 분과 초를 0으로 설정
    const intervals = Array.from({ length: 24 }, (_, i) => i + 1); // 1시간 간격으로 24번 API 호출

    const fetchForecast = async (hours) => {
      // const forecastTime = new Date(
      //   now.getTime() + (hours + 1) * 60 * 60 * 1000
      // );
      const forecastTime = new Date(
        now.getTime() + (hours % 24) * 60 * 60 * 1000
      );
      // const forecastTime = new Date(now.getTime() + hours * 60 * 60 * 1000);
      const base_date = forecastTime
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      const base_time = forecastTime.toISOString().slice(11, 13) + "00";

      const apiUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${serviceKey}&numOfRows=1000&pageNo=1&base_date=${base_date}&base_time=${base_time}&nx=55&ny=127`;

      const response = await axios.get(apiUrl);
      const result = convert.xml2js(response.data, { compact: true });
      console.log(result);
      const forecastItems =
        result.response &&
        result.response.body &&
        result.response.body.items &&
        result.response.body.items.item;

      if (!forecastItems) {
        console.error("API response does not contain forecast items.");
        return [];
      }

      const weatherData = forecastItems
        .filter((item) => item.category._text === "T1H")
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
      const allWeatherData = [];
      for (const hours of intervals) {
        const forecastTime = new Date(
          now.getTime() + (hours + 1) * 60 * 60 * 1000
        ); // 현재 시간에서 1시간 후부터 API 호출
        const data = await fetchForecast(forecastTime);
        if (data.length > 0) {
          // API 응답이 있는 경우만 데이터를 추가
          allWeatherData.push(...data);
        }
      }
      setWeatherData(allWeatherData);
    };

    fetchAllForecasts();
  }, []);
  // 데이터를 시간 순으로 정렬
  const sortedData = weatherData.sort(
    (a, b) => new Date(a.time) - new Date(b.time)
  );

  return (
    <ResponsiveContainer width="97%" height={300}>
      <BarChart
        data={sortedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" name="예보값" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MainChart;

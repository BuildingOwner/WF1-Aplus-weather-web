import React, { useState } from "react";
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
//
const MainChart = () => {
  const [weatherData, setWeatherData] = useState([
    // 여기에 원하는 데이터를 넣어주세요.
    { dataTime: "16:00", seoul: -3 },
    { dataTime: "17:00", seoul: -3 },
    { dataTime: "18:00", seoul: -3 },
    { dataTime: "19:00", seoul: -3 },
    { dataTime: "20:00", seoul: -1 },
    { dataTime: "21:00", seoul: -3 },
    { dataTime: "22:00", seoul: -3 },
    { dataTime: "23:00", seoul: -2 },
    { dataTime: "00:00", seoul: -1 },
    { dataTime: "01:00", seoul: 2 },
    { dataTime: "02:00", seoul: 2 },
    { dataTime: "02:00", seoul: 2 },
    { dataTime: "03:00", seoul: 2 },
    { dataTime: "04:00", seoul: 1 },
    { dataTime: "05:00", seoul: 1 },
    { dataTime: "06:00", seoul: -1 },
    { dataTime: "07:00", seoul: -1 },
    { dataTime: "08:00", seoul: -2 },
    { dataTime: "09:00", seoul: -3 },
    { dataTime: "10:00", seoul: -4 },
    { dataTime: "11:00", seoul: -4 },
    { dataTime: "12:00", seoul: -4 },
    { dataTime: "13:00", seoul: -4 },
    { dataTime: "14:00", seoul: -3 },
    { dataTime: "15:00", seoul: -3 },
  ]);

  // 데이터를 시간 순으로 정렬
  const sortedData = weatherData.sort(
    (a, b) => new Date(b.dataTime) - new Date(a.dataTime)
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={sortedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dataTime" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="seoul" fill="#ffb766" name="시간별 예보" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MainChart;

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

const MainChart = () => {
  const [weatherData, setWeatherData] = useState([
    // 여기에 원하는 데이터를 넣어주세요.
    { dataTime: "00:00", seoul: 10 },
    { dataTime: "01:00", seoul: 11 },
    { dataTime: "02:00", seoul: 12 },
    { dataTime: "02:00", seoul: 12 },
    { dataTime: "03:00", seoul: 12 },
    { dataTime: "04:00", seoul: 12 },
    { dataTime: "05:00", seoul: 12 },
    { dataTime: "06:00", seoul: 12 },
    { dataTime: "07:00", seoul: 12 },
    { dataTime: "08:00", seoul: 12 },
    { dataTime: "09:00", seoul: 12 },
    { dataTime: "10:00", seoul: 12 },
    { dataTime: "11:00", seoul: 12 },
    { dataTime: "12:00", seoul: 12 },
    { dataTime: "13:00", seoul: 12 },
    { dataTime: "14:00", seoul: 12 },
    { dataTime: "15:00", seoul: 12 },
    { dataTime: "16:00", seoul: 12 },
    { dataTime: "17:00", seoul: 12 },
    { dataTime: "18:00", seoul: 12 },
    { dataTime: "19:00", seoul: 12 },
    { dataTime: "20:00", seoul: 12 },
    { dataTime: "21:00", seoul: 12 },
    { dataTime: "22:00", seoul: 12 },
    { dataTime: "23:00", seoul: 13 },
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
        <Bar dataKey="seoul" fill="#8884d8" name="Temperature" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MainChart;

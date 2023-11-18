import React, { useState, useEffect } from 'react';
import axios from 'axios';
import convert from 'xml-js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { serviceKey } from '../../private/key';

const WeatherChart = () => {
  const [weatherData, setWeatherData] = useState([]); // 실제 서비스 키로 대체해야 합니다.

  useEffect(() => {
    const itemCodes = ['PM10', 'PM25'];
    const fetchItems = itemCodes.map(itemCode => {
      const apiUrl = `https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst?serviceKey=${serviceKey}&returnType=xml&numOfRows=24&pageNo=1&itemCode=${itemCode}&dataGubun=HOUR&searchCondition=MONTH`;
  
      return axios.get(apiUrl)
        .then((response) => {
          const result = convert.xml2js(response.data, { compact: true });
          const weatherItems = result.response.body.items.item;
  
          return weatherItems.map(item => {
            const date = new Date(item.dataTime._text);
            const time = `${date.getHours()}:00`;
  
            return {
              seoul: item.seoul._text,
              dataTime: time,
              itemCode: item.itemCode._text
            };
          });
        })
    });
  
    Promise.all(fetchItems)
      .then(responses => {
        const [pm10Data, pm25Data] = responses;
  
        const mergedData = pm10Data.map((item, index) => {
          return {
            ...item,
            pm25: pm25Data[index].seoul
          };
        });
        const reversedData = mergedData.reverse();

        setWeatherData(reversedData);
      })
      .catch((error) => {
        console.error('오염 정보 데이터 가져오기 오류:', error);
      });
  }, []);

  // 데이터를 시간 순으로 정렬
const sortedData = weatherData.sort((a, b) => new Date(b.dataTime) - new Date(a.dataTime));


  return (
    <ResponsiveContainer width="97%" height={300}>
      <BarChart
        data={sortedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dataTime" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="seoul" fill="#8884d8" name="PM10" />
        <Bar dataKey="pm25" fill="#82ca9d" name="PM2.5" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeatherChart;


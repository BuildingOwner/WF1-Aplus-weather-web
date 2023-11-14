import React, { useState, useEffect } from 'react';
import axios from 'axios';
import convert from 'xml-js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { serviceKey } from '../../private/key';

const WeatherChart2 = () => {
  const [weatherData, setWeatherData] = useState([]); 

  useEffect(() => {
    const itemCodes = ['PM10', 'PM25'];
    const fetchItems = itemCodes.map(itemCode => {
      const apiUrl = `https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst?serviceKey=${serviceKey}&returnType=xml&numOfRows=10&pageNo=1&itemCode=${itemCode}&dataGubun=DAILY&searchCondition=MONTH`;
  
      return axios.get(apiUrl)
        .then((response) => {
          const result = convert.xml2js(response.data, { compact: true });
          const weatherItems = result.response.body.items.item;
  
          return weatherItems.map(item => {
            const date = new Date(item.dataTime._text);
  
            return {
              seoul: item.seoul._text,
              dataTime: date,
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

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={weatherData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dataTime" tickFormatter={(tickItem) => `${tickItem.getMonth() + 1}/${tickItem.getDate()}`} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="seoul" stroke="#8884d8" name="PM10" />
        <Line type="monotone" dataKey="pm25" stroke="#82ca9d" name="PM2.5" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeatherChart2;

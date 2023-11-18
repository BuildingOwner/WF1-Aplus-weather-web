import React, { useState, useEffect } from "react";
import "../../css/header/DateTime.css";
function DateTime() {
  const [now, setNow] = useState(new Date());

  const year = now.getFullYear(); // 년도를 가져옵니다.
  const month = now.getMonth() + 1; // 월을 가져옵니다. (0~11로 표현되므로 +1을 해줍니다)
  const day = now.getDate(); // 일을 가져옵니다.

  // 요일을 가져옵니다. (0~6으로 표현되므로 해당 요일에 맞는 한글을 배열에서 찾습니다)
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[now.getDay()];

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const time = now.toLocaleTimeString();

  return (
    <div className="date-time">
      <span className="date-time-time">{time}</span>
      <span className="date-time-date">{year}년 {month}월 {day}일 {weekday}요일</span>
    </div>
  );
}

export default DateTime;

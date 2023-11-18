import React, { useState, useEffect } from "react";
import "../../css/header/DateTime.css";
function DateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  return (
    <div className="date-time">
      <span className="date-time-time">{time}</span>
      <span>{date}</span>
    </div>
  );
}

export default DateTime;

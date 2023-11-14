import React, { useState, useEffect } from "react";

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
      <p>{date}</p>
      <p>{time}</p>
    </div>
  );
}

export default DateTime;

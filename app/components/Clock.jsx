import React, { useState, useEffect } from 'react';

const Clock = (props) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 100)

    return () => clearInterval(interval);
  }, [currentTime])

  return (
    <div className="clock-wrapper">{currentTime}</div>
  )
}

export default Clock;
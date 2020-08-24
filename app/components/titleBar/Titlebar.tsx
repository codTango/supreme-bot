import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

export default function Titlebar(): JSX.Element {
  const [timeNow, setTime] = useState(
    DateTime.local().toLocaleString(DateTime.TIME_24_WITH_SECONDS)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(DateTime.local().toLocaleString(DateTime.TIME_24_WITH_SECONDS));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dateNow = DateTime.local().toFormat('LL.dd.yy');
  return (
    <div className="title-bar">
      <div className="timer">
        <span className="time-box">{timeNow}</span>
        <span className="time-box">{dateNow}</span>
      </div>
    </div>
  );
}

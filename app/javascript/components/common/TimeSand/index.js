import React from "react";
import './TimeSand.css';

const TimeSand = () => {
  return (
    <div className="hour-glass">
      <div className="glass"></div>
      <div className="sand-stream"></div>
      <div className="top-sand"></div>
      <div className="bottom-sand"></div>
    </div>
  );
};

export default TimeSand;

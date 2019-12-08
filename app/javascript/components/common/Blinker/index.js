import React from "react";

// The Blinker Glows from green to yellow to red depending on the time 

const Blinker = () => {
  return (
    <div className="loader-bg">
      <div className="loader-track">
        <div className="loader-fill" />
        Blinker
      </div>
    </div>
  );
};

export default Blinker;

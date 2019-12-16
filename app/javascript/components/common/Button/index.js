import React from "react";
import "./Button.css";

const Button = props => {
  const { handleSubmit, label, extraClass } = props;

  let btnClass = " button ";
  if (extraClass) {
    btnClass += extraClass;
  }
  return (
    <button className={btnClass} onClick={handleSubmit}>
      {label}
    </button>
  );
};


export default Button;

import React from "react";
import "./Button.scss";

const Button = (props) => {
  return (
    <>
      <button className={`btn-reply ${props.className}`}>
        {props.svg}
        {props.text}
      </button>
    </>
  );
};

export default Button;

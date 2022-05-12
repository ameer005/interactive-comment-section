import React from "react";

import "./ButtonSubmit.scss";

const ButtonSubmit = (props) => {
  return (
    <button className="btn-submit" type="submit">
      {props.btnName}
    </button>
  );
};

export default ButtonSubmit;

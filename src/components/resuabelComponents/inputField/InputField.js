import React from "react";
import ButtonSubmit from "../button/ButtonSubmit";

import "./InputField.scss";

const InputField = (props) => {
  return (
    <form onSubmit={props.onSubmit} className="form">
      <textarea
        value={props.term}
        onChange={(e) => props.setTerm(e.target.value)}
        className="form__input"
        placeholder="Add a comment..."
      />
      <ButtonSubmit btnName={props.btnName} />
    </form>
  );
};

export default InputField;

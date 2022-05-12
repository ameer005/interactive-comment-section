import React from "react";
import { useSelector } from "react-redux";
import { getAllCommentData } from "../../../features/comments/commentSlice";

const InputField = (props) => {
  const data = useSelector(getAllCommentData);
  const currentUser = data.comments.currentUser;

  return (
    <div className="add-comment">
      <img
        src={currentUser.image.png}
        className="img__current-user"
        alt="current user pic"
      />
      <form onSubmit={props.onSubmit} className="form">
        <textarea
          value={props.term}
          onChange={(e) => props.setTerm(e.target.value)}
          className="form__input"
          placeholder="Add a comment..."
        />
        <button className="btn-submit" type="submit">
          send
        </button>
      </form>
    </div>
  );
};

export default InputField;

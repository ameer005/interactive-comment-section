import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAllCommentData } from "../../features/comments/commentSlice";
import "./AddComment.scss";
import { v4 as uuidv4 } from "uuid";
import { addComment } from "../../features/comments/commentSlice";
import { useDispatch } from "react-redux";

const AddComment = () => {
  const [term, setTerm] = useState("");
  const data = useSelector(getAllCommentData);
  const currentUser = data.comments.currentUser;
  const dispatch = useDispatch();

  if (data.status !== "success") return;

  const onSubmit = (e) => {
    e.preventDefault();

    if (!term) return;

    // USER OBJECT
    const userObject = {
      id: uuidv4(),
      content: term,
      createdAt: "5 min ago",
      score: 0,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
      replies: [],
    };

    dispatch(addComment(userObject));
    setTerm("");
  };

  return (
    <div className="add-comment">
      <img
        src={currentUser.image.png}
        className="img__current-user"
        alt="current user pic"
      />
      <form onSubmit={onSubmit} className="form">
        <textarea
          className="form__input"
          value={term}
          placeholder="Add a comment..."
          onChange={(e) => setTerm(e.target.value)}
        />
        <button className="btn-submit" type="submit">
          send
        </button>
      </form>
    </div>
  );
};

export default AddComment;

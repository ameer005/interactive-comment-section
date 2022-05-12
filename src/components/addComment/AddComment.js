import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./AddComment.scss";
import { getAllCommentData } from "../../features/comments/commentSlice";

import { v4 as uuidv4 } from "uuid";
import { addComment } from "../../features/comments/commentSlice";
import InputField from "../resuabelComponents/inputField/InputField";

const AddComment = () => {
  const data = useSelector(getAllCommentData);
  const currentUser = data.comments.currentUser;
  const [term, setTerm] = useState("");
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

  return <InputField term={term} setTerm={setTerm} onSubmit={onSubmit} />;
};

export default AddComment;

import React from "react";
import { useSelector } from "react-redux";
import { getAllCommentData } from "../../features/comments/commentSlice";
import Comment from "../comment/Comment";

const CommentList = () => {
  const data = useSelector(getAllCommentData);

  if (data.status !== "success") return;

  const renderList = data.comments.comments.map((comment, index) => (
    <Comment key={index} data={comment} />
  ));

  return <div>{renderList}</div>;
};

export default CommentList;

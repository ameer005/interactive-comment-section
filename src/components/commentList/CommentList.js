import React from "react";
import { useSelector } from "react-redux";
import { getAllCommentData } from "../../features/comments/commentSlice";
import Comments from "../comments/Comments";
import "./CommentList.scss";

const CommentList = () => {
  const data = useSelector(getAllCommentData);

  if (data.status !== "success") return;

  const renderList = data.comments.comments.map((comment) => {
    return <Comments key={comment.id} data={comment} />;
  });

  return <div className="comment-list">{renderList}</div>;
};

export default CommentList;

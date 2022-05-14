import React, { useEffect, useState } from "react";
import "./CommentTemp.scss";
import { commentPostedTime } from "../../../utils/commentPostedTime";

const CommentTemp = (props) => {
  const [time, setTime] = useState("");
  const createdAt = new Date(props.data.createdAt);
  const today = new Date();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const differenceInTime = today.getTime() - createdAt.getTime();
      setTime(commentPostedTime(differenceInTime));
    }, 1000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, []);

  const isNan = () => {
    if (isNaN(createdAt)) return props.data.createdAt;

    return `${time} ago`;
  };

  const reply = () => {
    if (!props.replyingTo) return null;

    return `@${props.replyingTo}`;
  };
  return (
    <div className={`comment ${props.className}`}>
      <div className="upvote">
        <div onClick={props.upVote} className="upvote__btn">
          +
        </div>
        <div className="upvote__count">{props.data.score}</div>
        <div onClick={props.downVote} className="upvote__btn">
          -
        </div>
      </div>

      <div className="profile-box">
        <div className="profile">
          <img
            src={props.data.user.image.png}
            alt="user image"
            className="profile__img"
          />
          <p className="profile__username">{props.data.user.username}</p>
          {props.currentUser()}
          <p className="profile__ago">{isNan()}</p>
        </div>
      </div>

      <div className="btn-group">
        {props.btnDelte()}
        {props.btnEditOrReply()}
      </div>

      <div className="comment-content">
        <div className="comment-content__text">
          <span className={props.replyingTo ? `username` : ""}>{reply()}</span>
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default CommentTemp;

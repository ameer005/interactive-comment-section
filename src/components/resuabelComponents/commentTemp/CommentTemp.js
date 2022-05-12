import React from "react";
import "./CommentTemp.scss";

const CommentTemp = (props) => {
  return (
    <div className="comment">
      <div className="upvote">
        <div className="upvote__btn">+</div>
        <div className="upvote__count">{props.data.score}</div>
        <div className="upvote__btn">-</div>
      </div>

      <div className="comment-content">
        <div className="profile-box">
          <div className="profile">
            <img
              src={props.data.user.image.png}
              alt="user image"
              className="profile__img"
            />
            <p className="profile__username">{props.data.user.username}</p>
            {props.currentUser()}
            <p className="profile__ago">{props.data.createdAt}</p>
          </div>
          <div className="btn-group">
            {props.btnDelte()}
            {props.btnEditOrReply()}
          </div>
        </div>
        <div className="text-box">
          <div className="text-box__text">{props.content}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentTemp;

import React from "react";
import "./Comment.scss";
import Button from "../resuabelComponents/button/Button";

const Comment = ({ data }) => {
  console.log(data);

  const svg = (
    <svg
      className="icon"
      width="14"
      height="13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
    </svg>
  );

  return (
    <div className="comment">
      <div className="upvote">
        <div className="upvote__btn">+</div>
        <div className="upvote__count">{data.score}</div>
        <div className="upvote__btn">-</div>
      </div>
      <div className="comment-content">
        <div className="profile-box">
          <div className="profile">
            <img
              src={data.user.image.png}
              alt="user image"
              className="profile__img"
            />
            <p className="profile__username">{data.user.username}</p>
            <p className="profile__ago">{data.createdAt}</p>
          </div>
          <Button text="Reply" svg={svg} className="btn-reply--blue" />
        </div>
        <div className="text-box">
          <p className="text-box__text">{data.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;

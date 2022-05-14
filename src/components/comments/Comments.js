import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Comments.scss";
import { useDispatch } from "react-redux";

import InputField from "../resuabelComponents/inputField/InputField";
import CommentTemp from "../resuabelComponents/commentTemp/CommentTemp";
import {
  updateComment,
  deleteComment,
  commentUpVote,
  commentDownVote,
  addReply,
} from "../../features/comments/commentSlice";
import DeleteModal from "../modal/DeleteModal";
import Replies from "../../replies/Replies";
import { getAllCommentData } from "../../features/comments/commentSlice";
import { v4 as uuidv4 } from "uuid";

const Comments = ({ data }) => {
  const data2 = useSelector(getAllCommentData);
  const currentUser2 = data2.comments.currentUser;

  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(data.content);
  const [reply, setReply] = useState(false);
  const [replyText, setReplyText] = useState(`@${data.user.username} `);
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();

  const currentUser = () => {
    return data.currentUser ? (
      <div className="profile__currentuser">You</div>
    ) : null;
  };

  // btn Delete
  const btnDelte = () => {
    if (!data.currentUser) return null;

    return (
      <button onClick={() => setModalShow(true)} className="btn btn--red">
        <svg
          className="icon"
          width="12"
          height="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" />
        </svg>
        Delete
      </button>
    );
  };

  // edit or reply
  const btnEditOrReply = () => {
    if (!data.currentUser) {
      return (
        <button onClick={() => setReply(true)} className="btn btn--blue">
          <svg
            className="icon"
            width="14"
            height="13"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
          </svg>
          Reply
        </button>
      );
    }

    return (
      <button onClick={() => setEdit(true)} className="btn btn--blue">
        <svg
          className="icon"
          width="14"
          height="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" />
        </svg>
        Edit
      </button>
    );
  };

  // UPVOTE AND DOWNVOTE
  const upVote = () => {
    dispatch(commentUpVote(data.id));
  };

  const downVote = () => {
    dispatch(commentDownVote(data.id));
  };

  // EDITING FUNCTIOANLITY
  const onSubmitEdit = (e) => {
    e.preventDefault();

    const updatedComment = {
      id: data.id,
      content: editText,
    };

    dispatch(updateComment(updatedComment));

    setEdit(false);
  };

  const editOrNot = () => {
    if (!edit)
      return (
        <CommentTemp
          data={data}
          btnDelte={btnDelte}
          btnEditOrReply={btnEditOrReply}
          currentUser={currentUser}
          content={data.content}
          upVote={upVote}
          downVote={downVote}
          className="comment--comment"
        />
      );

    return (
      <CommentTemp
        data={data}
        btnDelte={btnDelte}
        btnEditOrReply={btnEditOrReply}
        currentUser={currentUser}
        upVote={upVote}
        downVote={downVote}
        className="comment--comment"
        content={
          <InputField
            btnName="update"
            term={editText}
            setTerm={setEditText}
            onSubmit={onSubmitEdit}
          />
        }
      />
    );
  };

  // DELETEING FUNCTIONALITY
  const onDelete = () => {
    dispatch(deleteComment(data.id));

    setModalShow(false);
  };

  // REPLYING FUCTIONALITY
  const onSubmitReply = (e) => {
    e.preventDefault();

    const userObject = {
      id: uuidv4(),
      content: replyText.replace(`@${data.user.username} `, ""),
      createdAt: "5 min ago",
      score: 0,
      currentUser: true,
      replyingTo: data.user.username,
      replyingToId: data.id,
      user: {
        image: {
          png: currentUser2.image.png,
          webp: currentUser2.image.webp,
        },
        username: currentUser2.username,
      },
    };

    dispatch(addReply(userObject));

    setReplyText(`@${data.user.username} `);
    setReply(false);
  };
  const replyInput = () => {
    if (!reply) return null;

    return (
      <div className="add-comment">
        <img
          src={currentUser2.image.png}
          className="img__current-user"
          alt="current user pic"
        />
        <InputField
          term={replyText}
          setTerm={setReplyText}
          onSubmit={onSubmitReply}
          btnName="Reply"
        />
      </div>
    );
  };

  const replyComments = () => {
    if (data.replies.lenght === 0) return null;

    return data.replies.map((reply) => <Replies key={reply.id} data={reply} />);
  };

  return (
    <>
      {editOrNot()}
      {replyInput()}
      <div className="comment-container">
        <div className="reply-container">{replyComments()}</div>
      </div>
      {modalShow ? (
        <DeleteModal setModalShow={setModalShow} onDelete={onDelete} />
      ) : null}
    </>
  );
};

export default Comments;

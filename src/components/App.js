import React, { useEffect } from "react";
import "./App.scss";
import CommentList from "./commentList/CommentList";
import AddComment from "../components/addComment/AddComment";
import {
  fetchComments,
  getAllCommentData,
} from "../features/comments/commentSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const App = () => {
  const data = useSelector(getAllCommentData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.entries(data.comments).length !== 0) return;
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <div className="app">
      <CommentList />
      <AddComment />
    </div>
  );
};

export default App;

import React, { useEffect } from "react";
import "./App.scss";
import CommentList from "./commentList/CommentList";
import AddComment from "../components/addComment/AddComment";
import {
  fetchComments,
  getAllCommentData,
} from "../features/comments/commentSlice";

import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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

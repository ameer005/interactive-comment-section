import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentsData from "../../common/apis/commentsData";
import _ from "lodash";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await commentsData.get();

    return response.data;
  }
);

const initialState = {
  comments: {},
  status: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,

  reducers: {
    addComment: (state, { payload }) => {
      state.comments.comments.push(payload);
    },
    updateComment: (state, { payload }) => {
      state.comments.comments.forEach((comment) => {
        if (comment.id === payload.id) comment.content = payload.content;
      });
    },
    deleteComment: (state, { payload }) => {
      const afterDelete = state.comments.comments.filter(
        (comment) => comment.id !== payload
      );

      state.comments.comments = afterDelete;
    },
    commentUpVote: (state, { payload }) => {
      state.comments.comments.forEach((comment) => {
        if (comment.id === payload) comment.score++;
      });
    },
    commentDownVote: (state, { payload }) => {
      state.comments.comments.forEach((comment) => {
        if (comment.id === payload) comment.score--;
      });
    },
    addReply: (state, { payload }) => {
      state.comments.comments.forEach((comment) => {
        if (comment.id === payload.replyingToId) comment.replies.push(payload);
      });
      console.log(payload);
    },
  },

  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.status = "loading";
    },
    [fetchComments.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.comments = payload;
    },
    [fetchComments.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const {
  addComment,
  updateComment,
  deleteComment,
  commentUpVote,
  commentDownVote,
  addReply,
} = commentSlice.actions;
export const getAllCommentData = (state) => state.comments;
export default commentSlice.reducer;

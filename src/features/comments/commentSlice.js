import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentsData from "../../common/apis/commentsData";

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
    },
    deleteReply: (state, { payload }) => {
      let afterDelete;
      state.comments.comments.forEach((comment) => {
        if (comment.id === payload.replyingToId) {
          afterDelete = comment.replies.filter(
            (reply) => reply.id !== payload.id
          );

          comment.replies = afterDelete;
        }
      });
    },
    updateReply: (state, { payload }) => {
      state.comments.comments.forEach((comment) => {
        if (comment.id === payload.replyingToId) {
          comment.replies.forEach((reply) => {
            if (reply.id === payload.id) reply.content = payload.content;
          });
        }
      });
    },
    replyUpvote: (state, { payload }) => {
      state.comments.comments.forEach((comment) => {
        if (comment.id === payload.replyingToId) {
          comment.replies.forEach((reply) => {
            if (reply.id === payload.id) reply.score++;
          });
        }
      });
    },
    replyDownvote: (state, { payload }) => {
      state.comments.comments.forEach((comment) => {
        if (comment.id === payload.replyingToId) {
          comment.replies.forEach((reply) => {
            if (reply.id === payload.id) reply.score--;
          });
        }
      });
    },
    addRepliedReply: (state, { payload }) => {
      state.comments.comments.forEach((comment) => {
        if (comment.id === payload.replyingToId) comment.replies.push(payload);
      });
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
  deleteReply,
  updateReply,
  replyUpvote,
  replyDownvote,
  addRepliedReply,
} = commentSlice.actions;
export const getAllCommentData = (state) => state.comments;
export default commentSlice.reducer;

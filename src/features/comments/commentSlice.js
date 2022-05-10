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

export const getAllCommentData = (state) => state.comments;
export default commentSlice.reducer;

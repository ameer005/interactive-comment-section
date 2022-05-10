import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./comments/commentSlice";

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./comments/commentSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistCongig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistCongig, commentsReducer);

// export const store = configureStore({
//   reducer: {
//     comments: persistedReducer,
//   },
// });

export const store = configureStore({
  reducer: { comments: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

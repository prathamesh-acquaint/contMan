import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice";
import loggedInSlice from "./loggedInSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    isLoggedIn: loggedInSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

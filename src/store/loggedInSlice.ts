import { createSlice } from "@reduxjs/toolkit";
import { requireAuth } from "../utils/auth";

const initialState = {
  isLoggedIn: requireAuth(),
};

const loggedInSlice = createSlice({
  name: "isLoggedIn",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
    },
  },
});

export const { login, logout } = loggedInSlice.actions;
export default loggedInSlice.reducer;

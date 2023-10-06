import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ContactState {
  isLoading: boolean;
  data: Array<object>;
  isError: boolean;
}

const token = localStorage.getItem("accessToken");

const configurations = {
  method: "get",
  url: "http://localhost:5001/api/users/current",
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const initialState: ContactState = {
  isLoading: false,
  data: [],
  isError: false,
};

export const fetchCurrentUser = createAsyncThunk(
  "fetchCurrentUser",
  async () => {
    const res = await axios(configurations);
    return res;
  }
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (state: ContactState, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state: ContactState, action) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      fetchCurrentUser.rejected,
      (state: ContactState, action) => {
        state.isError = true;
      }
    );
  },
  reducers: undefined,
});

export default contactsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ContactState {
  isLoading: boolean;
  data: Array<object>;
  isError: boolean;
}

const initialState: ContactState = {
  isLoading: false,
  data: [],
  isError: false,
};

export const fetchCurrentUser: any = createAsyncThunk(
  "fetchCurrentUser",
  async (token) => {
    const configurations = {
      method: "get",
      url: "http://localhost:5001/api/users/current",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios(configurations);
    console.log("current user redux", res);
    return res;
  }
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (state: ContactState) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state: ContactState, action) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(fetchCurrentUser.rejected, (state: ContactState) => {
      state.isError = true;
    });
  },
  reducers: undefined,
});

export default contactsSlice.reducer;

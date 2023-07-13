import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockApi } from "../api/mockApi";
import { RootState } from "./store";

export interface User {
  username: string;
  password: string;
}

export interface UserObj {
  username: string | null;
  password: string | null;
}

const initialState: UserObj = {
  username: null,
  password: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User }>) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: action.payload.user.username,
          password: action.payload.user.password,
        })
      );
      state.username = action.payload.user.username;
      state.password = action.payload.user.password;
    },
  },
  extraReducers(builder) {},
});

export const userState = (state: RootState) => state.login;
export const { setUser } = loginSlice.actions;

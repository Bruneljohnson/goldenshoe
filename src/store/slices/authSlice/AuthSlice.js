import { createSlice } from "@reduxjs/toolkit";
import { getStoredToken } from "./AuthActionCreators";

const storedToken = getStoredToken();
const storedUser = JSON.parse(localStorage.getItem("user"));
const storedId = localStorage.getItem("id");
const initialToken = storedToken?.token ?? null;
const initialUser = storedUser ?? null;
const initialId = storedId ?? null;
const initialAuthState = {
  isAuth: !!initialToken,
  token: initialToken,
  id: initialId,
  user: initialUser,
}; // isAuth: !!initialToken

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isAuth = true;
    },
    id(state, action) {
      state.id = action.payload;
    },
    storeUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.token = ``;
      state.user = {};
    },
  },
});

export const AuthSliceActions = AuthSlice.actions;

export default AuthSlice.reducer;

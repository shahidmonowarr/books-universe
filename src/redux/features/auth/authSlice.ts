import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  token: string | null;
}

const initialState: IAuth = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginState: (state, action) => {
      state.token = action.payload.accessToken;
    },
    logoutState: (state) => {
      state.token = null;
    },
  },
});

export const { loginState, logoutState } = authSlice.actions;

export default authSlice.reducer;

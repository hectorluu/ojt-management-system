const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
    accessToken: null,
  },
  reducers: {
    authLogin: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    authUpdateUser: (state, action) => ({
      user: action.payload.user,
      accessToken: action.payload.accessToken,
    }),
    authFetchMe: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    authRefreshToken: (state, action) => ({}),
    authRefreshPage: (state, action) => ({}),
    authLogOut: (state, action) => ({}),
  },
});
export const {
  authLogin,
  authUpdateUser,
  authFetchMe,
  authRefreshToken,
  authRefreshPage,
  authLogOut,
} = authSlice.actions;
export default authSlice.reducer;

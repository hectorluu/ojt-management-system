import { AUTH_PATH, COMMON_PATH } from "api/apiUrl";
const { default: axios } = require("api/axios");

export const requestAuthRegister = (data) => {
  return axios.post("/auth/register", {
    ...data,
  });
};
export const requestAuthLogin = (data) => {
  return axios.post(AUTH_PATH.LOGIN, data);
};
export const requestAuthFetchMe = (token) => {
  if (!token) return;
  return axios.get(COMMON_PATH.GET_ME, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const requestAuthRefreshToken = (token) => {
  if (!token) return;
  return axios.post("/token", {
    "Content-Type": "Application/json",
    refreshToken: token,
  });
};

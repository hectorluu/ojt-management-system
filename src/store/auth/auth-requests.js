import { authPath, commonPath } from "api/apiUrl";
const { default: axios } = require("api/axios");

export const requestAuthRegister = (data) => {
  return axios.post("/auth/register", {
    ...data,
  });
};
export const requestAuthLogin = (data) => {
  return axios.post(authPath.LOGIN, data);
};
export const requestAuthFetchMe = (token) => {
  if (!token) return;
  return axios.get(commonPath.GET_ME, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const requestAuthRefreshToken = (token) => {
  if (!token) return;
  return axios.post("/authen/refresh", {
    "Content-Type": "Application/json",
    refreshToken: token,
  });
};

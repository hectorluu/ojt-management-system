import { authPath, commonPath } from "logic/api/apiUrl";
const { default: axios } = require("logic/api/axios");

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

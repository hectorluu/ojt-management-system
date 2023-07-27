const { default: axios } = require("axios");

export default axios.create({
  baseURL: process.env.REACT_APP_HOST_API_KEY,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_HOST_API_KEY,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

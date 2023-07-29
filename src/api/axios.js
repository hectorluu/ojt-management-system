const { default: axios } = require("axios");

export default axios.create({
  baseURL: "https://localhost:44378",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
export const axiosPrivate = axios.create({
  baseURL: "https://localhost:44378",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

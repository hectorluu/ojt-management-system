export const apiURL = "http://localhost:3009/api";
export const imgbbAPI =
  "https://api.imgbb.com/1/upload?key=5a696fcbb8ed78b24298075df41fd1d8";

export const createNewAccountImgAPI = "";

//fetchter for SWR
export const fetcher = (...args) => fetch(...args).then((res) => res.json());

const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: "/free",
  defaultPath: "/dashboard/default",
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
};

export default config;

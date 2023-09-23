import { axiosPrivate } from "logic/api/axios";
import { useEffect, useMemo } from "react";
import useRefreshToken from "./useRefreshToken";
import { getToken } from "logic/utils/auth";

export default function useAxiosPrivate() {
  const refresh = useRefreshToken();
  // const { auth } = useSelector((state) => state);
  const { access_token } = getToken();
  const accessToken = useMemo(() => access_token, [access_token]);

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, refresh]);

  return axiosPrivate;
}

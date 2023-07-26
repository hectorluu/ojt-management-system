import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authRefreshPage, authUpdateUser } from "./store/auth/auth-slice";
import { getToken, logOut } from "utils/auth";

Modal.setAppElement("#root");
Modal.defaultStyles = {};

function App({ children }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      const { access_token } = getToken();
      dispatch(
        authUpdateUser({
          user: user,
          accessToken: access_token,
        })
      );
    } else {
      const { access_token } = getToken();
      if (access_token) {
        dispatch(authRefreshPage(access_token));
      } else {
        dispatch(authUpdateUser({}));
        logOut();
      }
    }
  }, [dispatch, user]);
  return <>{children}</>;
}

export default App;

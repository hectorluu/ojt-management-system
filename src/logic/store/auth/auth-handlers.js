import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { logOut, saveToken } from "logic/utils/auth";
import {
  requestAuthFetchMe,
  requestAuthLogin,
  requestAuthRefreshToken,
} from "./auth-requests";
import { authUpdateUser } from "./auth-slice";

function* handleAuthLogin({ payload }) {
  try {
    const response = yield call(requestAuthLogin, payload);
    //if (response.data.accessToken || response.data.refreshToken) {
    if (response.data) {
      saveToken(response.data.token, response.data.refreshToken);
      yield call(handleAuthFetchMe, { payload: response.data.token });
    }
  } catch (error) {
    const response = error?.response;
    if (response.status === 400) {
      toast.error(response?.data);
      return;
    }
  }
}

function* handleAuthFetchMe({ payload }) {
  try {
    const response = yield call(requestAuthFetchMe, payload);
    if (response.status === 200) {
      yield put(
        authUpdateUser({
          user: response.data,
          accessToken: payload,
        })
      );
    }
    // response.data -> userInfo
  } catch (error) {}
}

function* handleAuthRefreshToken({ payload }) {
  try {
    const response = yield call(requestAuthRefreshToken, payload);
    if (response.data) {
      saveToken(response.data.token, response.data.refreshToken);
      yield call(handleAuthFetchMe, {
        payload: response.data.token,
      });
    } else {
      yield handleAuthLogOut();
    }
  } catch (error) {}
}

function* handleAuthRefreshPage({ payload }) {
  try {
    const response = yield call(requestAuthFetchMe, payload);
    if (response.data) {
      yield put(
        authUpdateUser({
          user: response.data,
          accessToken: payload,
        })
      );
    } else {
      yield handleAuthLogOut();
    }
  } catch (error) {}
}

function* handleAuthLogOut() {
  yield put(
    authUpdateUser({
      user: undefined,
      accessToken: null,
    })
  );
  logOut();
}

export {
  handleAuthLogin,
  handleAuthFetchMe,
  handleAuthRefreshToken,
  handleAuthRefreshPage,
  handleAuthLogOut,
};

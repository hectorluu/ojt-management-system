import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { logOut, saveToken } from "logic/utils/auth";
import {
  requestAuthFetchMe,
  requestAuthLogin,
  requestAuthRefreshToken,
  requestAuthRegister,
} from "./auth-requests";
import { authUpdateUser } from "./auth-slice";
import { authNoti } from "logic/constants/notification";

export default function* handleAuthRegister(action) {
  const { payload } = action;
  try {
    const response = yield call(requestAuthRegister, payload);
    if (response.status === 201) {
      toast.success("Created new account successfully");
    }
  } catch (error) {
    console.log(error);
  }
}
function* handleAuthLogin({ payload }) {
  try {
    const response = yield call(requestAuthLogin, payload);
    //if (response.data.accessToken || response.data.refreshToken) {
    if (response.data) {
      saveToken(response.data.token, response.data.refreshToken);
      yield call(handleAuthFetchMe, { payload: response.data.token });
    }
  } catch (error) {
    const response = error.response.data;
    if (response.statusCode === 401) {
      toast.error(authNoti.ERROR.WRONG_EMAIL_PASSWORD);
      return;
    }
  }
}

function* handleAuthFetchMe({ payload }) {
  try {
    const response = yield call(requestAuthFetchMe, payload);
    if (response.status === 200) {
      console.log(response);
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

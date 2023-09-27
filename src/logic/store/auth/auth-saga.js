import { takeLatest } from "redux-saga/effects";
import {
  handleAuthLogin,
  handleAuthLogOut,
  handleAuthRefreshToken,
  handleAuthRefreshPage,
} from "./auth-handlers";
import {
  authLogin,
  authLogOut,
  authRefreshToken,
  authRefreshPage,
} from "./auth-slice";
export default function* authSaga() {
  yield takeLatest(authLogin.type, handleAuthLogin);
  yield takeLatest(authRefreshToken.type, handleAuthRefreshToken);
  yield takeLatest(authRefreshPage.type, handleAuthRefreshPage);
  yield takeLatest(authLogOut.type, handleAuthLogOut);
}

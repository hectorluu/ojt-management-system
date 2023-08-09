import { takeLatest } from "redux-saga/effects";
import handleAuthRegister, {
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
  authRegister,
} from "./auth-slice";
export default function* authSaga() {
  yield takeLatest(authRegister.type, handleAuthRegister);
  yield takeLatest(authLogin.type, handleAuthLogin);
  yield takeLatest(authRefreshToken.type, handleAuthRefreshToken);
  yield takeLatest(authRefreshPage.type, handleAuthRefreshPage);
  yield takeLatest(authLogOut.type, handleAuthLogOut);
}

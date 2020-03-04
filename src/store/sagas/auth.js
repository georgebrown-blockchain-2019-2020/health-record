import { put, call } from "redux-saga/effects";
import { delay } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions/index";
import axios from "axios";
import { SIGN_IN_URL, SIGN_UP_URL, UPDATE_USER_INFO } from "../../api";
const logoutSucceed = () => {
  console.log("function");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");
  console.log(logoutSucceed === { type: actionTypes.AUTH_LOGOUT });
  yield put(actions.logoutSucceed());
}
export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogout());
}
export function* setUpRole(action) {
  yield put(actions.setupChainCodeIDStart());
  const updatedProfile = {
    idToken: action.idToken,
    displayName: action.role,
    returnSecureToken: false
  };
  try {
    const userProfile = yield axios.post(UPDATE_USER_INFO, updatedProfile);
    const chainCodeID =
      userProfile.data.displayName + "_" + userProfile.data.localId;
    yield localStorage.setItem("chainCodeID", chainCodeID);
    yield put(actions.setupChainCodeIDSuccess(chainCodeID));
  } catch (error) {
    yield put(actions.setupChainCodeIDFail());
  }
}
export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url = SIGN_UP_URL;
  if (!action.isSignup) {
    url = SIGN_IN_URL;
  }
  try {
    const response = yield axios.post(url, authData);

    if (response.data.displayName) {
      const chainCodeID =
        response.data.displayName + "_" + response.data.idToken;
      yield localStorage.setItem("chainCodeID", chainCodeID);
      yield put(actions.setupChainCodeIDSuccess(chainCodeID));
    }

    const expirationData = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationData);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeOut(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}
export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.authLogout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate > new Date()) {
      const userId = yield localStorage.getItem("userId");
      const chainCodeID = yield localStorage.getItem("chainCodeID");
      yield put(actions.setupChainCodeIDSuccess(chainCodeID));
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeOut(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(actions.authLogout());
    }
  }
}

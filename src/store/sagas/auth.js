import { put, call } from "redux-saga/effects";
import { delay } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions/index";
import axios from "axios";
import {
  SIGN_IN_URL,
  SIGN_UP_URL,
  UPDATE_USER_INFO,
  DATABASE_URL
} from "../../api";
const logoutSucceed = () => {
  console.log("function");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
export function* logoutSaga(action) {
  console.log("hello1");
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");
  yield call([localStorage, "removeItem"], "role");
  yield call([localStorage, "removeItem"], "userName");
  console.log(logoutSucceed === { type: actionTypes.AUTH_LOGOUT });
  yield put(actions.logoutSucceed());
}
export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogout());
}
export function* setUpUser(action) {
  yield put(actions.setupUserStart());
  const infor = {
    role: action.role,
    userName: action.userName,
    userId: action.userId
  };
  const res = yield axios.post(
    `${DATABASE_URL}/information.json?auth=${action.idToken}`,
    infor
  );
  console.log(res);
  try {
    yield put(actions.setupUserSuccess(action.role, action.userName));
  } catch (error) {
    yield put(actions.setupUserFail(error));
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
    const queryParams = `?auth=${response.data.idToken}&orderBy="userId"&equalTo="${response.data.localId}"`;
    const res = yield axios.get(
      `${DATABASE_URL}/information.json${queryParams}`
    );
    console.log(res.data);
    if (res.data) {
      for (let key in res.data) {
        console.log(key);
        yield put(
          actions.setupUserSuccess(res.data[key].role, res.data[key].userName)
        );
        yield localStorage.setItem("role", res.data[key].role);
        yield localStorage.setItem("userName", res.data[key].userName);
      }
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
      const role = yield localStorage.getItem("role");
      const userName = yield localStorage.getItem("userName");
      yield put(actions.setupUserSuccess(role, userName));
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

import * as actionTypes from "./actionTypes";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};
export const authLogout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};
export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
export const checkAuthTimeOut = expirationTime => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  };
};
export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignup: isSignup
  };
};
export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};
export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
};
export const setupUser = (idToken, role, userName, userId) => {
  return {
    type: actionTypes.SET_UP_USER_ID,
    idToken: idToken,
    role: role,
    userName: userName,
    userId: userId
  };
};
export const setupUserSuccess = (role, userName) => {
  return {
    type: actionTypes.SET_UP_USER_SUCCESS,
    role: role,
    userName: userName
  };
};
export const setupUserStart = () => {
  return {
    type: actionTypes.SET_UP_USER_START
  };
};

export const setupUserFail = error => {
  return {
    type: actionTypes.SET_UP_USER_FAIL,
    error: error
  };
};

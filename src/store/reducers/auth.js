import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  role: null,
  userName: null,
  authRedirectPath: "/"
};
const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false
  });
};
const setUpUser = (state, action) => {
  return updateObject(state, {
    role: action.role,
    userName: action.userName,
    loading: false,
    error: null
  });
};
const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};
const authLogout = (state, action) => {
  console.log("hello");
  return updateObject(state, {
    token: null,
    userId: null,
    role: null,
    userName: null
  });
};
const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
    case actionTypes.SET_UP_USER_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
    case actionTypes.SET_UP_USER_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    case actionTypes.SET_UP_USER_SUCCESS:
      return setUpUser(state, action);
    default:
      return state;
  }
};

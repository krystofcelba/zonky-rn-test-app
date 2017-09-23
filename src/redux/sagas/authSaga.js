import { delay } from 'redux-saga';
import { put, select, call, fork, take, race } from 'redux-saga/effects';
import {
  LOGIN,
  LOGOUT,
  storeAuthToken,
  logout,
  loginSuccess as loginSuccessAction,
  resetNavigatorToRoute,
  updateUsername,
  updatePassword,
} from '../actions/auth';

import API from './api';

function* loginSuccess() {
  yield put(loginSuccessAction());
  yield put(resetNavigatorToRoute('Main'));
  yield put(updateUsername(''));
  yield put(updatePassword(''));
}

function* authorize(isUserLogged) {
  try {
    let token = null;
    if (!isUserLogged) {
      const { username, password } = yield select(state => state.auth.credentials);
      token = yield call(API.authorizeUser, username, password);
      yield call(loginSuccess);
    } else {
      const oldToken = yield select(state => state.auth.token);
      token = yield call(API.refreshToken, oldToken);
    }
    yield put(storeAuthToken(token));
    return token;
  } catch (e) {
    console.log(e);
    yield put(logout());
    return null;
  }
}

function* tokenRefreshingLoop(storedToken) {
  let token = storedToken;
  while (true) {
    const isUserLogged = token != null;
    token = yield call(authorize, isUserLogged);
    if (token == null) return;

    const expiresInMS = token.expires_in * 1000;
    yield call(delay, expiresInMS);
  }
}

function* authenticationFlow() {
  const storedToken = yield select(state => state.auth.token);

  while (true) {
    if (!storedToken) yield take(LOGIN);

    const { logoutAction } = yield race({
      logoutAction: take(LOGOUT),
      authLoop: call(tokenRefreshingLoop, storedToken),
    });

    if (logoutAction) {
      yield put(storeAuthToken, null);
    }
  }
}

export default function* root() {
  yield fork(authenticationFlow);
}

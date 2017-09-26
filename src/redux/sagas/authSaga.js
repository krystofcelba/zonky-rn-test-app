import { delay } from 'redux-saga';
import { call, fork, put, race, select, take } from 'redux-saga/effects';

import {
  LOGIN,
  loginFailure,
  loginSuccess as loginSuccessAction,
  LOGOUT,
  logout,
  resetNavigatorToRoute,
  storeAuthToken,
  updatePassword,
  updateUsername,
} from '../actions/auth';
import * as API from './api';

function* loginSuccess(token) {
  yield put(storeAuthToken(token));
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
      yield call(loginSuccess, token);
    } else {
      const oldToken = yield select(state => state.auth.token);
      token = yield call(API.refreshToken, oldToken);
      yield put(storeAuthToken(token));
    }
    return token;
  } catch (e) {
    console.log(e);
    yield put(loginFailure(e));
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
      yield put(storeAuthToken(null));
    }
  }
}

export default function* root() {
  yield fork(authenticationFlow);
}

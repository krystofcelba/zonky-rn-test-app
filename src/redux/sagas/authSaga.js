import { delay } from 'redux-saga';
import { put, takeLatest, select, call, fork, take, race } from 'redux-saga/effects';
import {
  LOGIN,
  LOGOUT,
  storeAuthToken,
  loginSuccess as loginSuccessAction,
  resetNavigatorToRoute,
} from '../actions/auth';

import API from './api';

function* loginSuccess() {
  yield put(loginSuccessAction());
  yield put(resetNavigatorToRoute('Main'));
}

function* fetchToken(refresh) {
  let body = '';
  if (refresh) {
    const token = yield select(state => state.auth.token);
    body = `grant_type=refresh_token&refresh_token=${token.refresh_token}&scope=${token.scope}`;
  } else {
    const { username, password } = yield select(state => state.auth.credentials);
    body = `username=${username}&password=${password}&grant_type=password&scope=SCOPE_APP_WEB`;
  }
  const headers = new Headers();
  headers.set('Content-Type', 'application/x-www-form-urlencoded');
  headers.set('Accept', 'application/json');
  headers.set('Authorization', 'Basic d2ViOndlYg==');
  const resp = yield API.post('/oauth/token', null, { headers, body });
  if (resp.ok) {
    return yield resp.json();
  }
  throw resp;
}

function* authorize(refresh) {
  try {
    const token = yield call(fetchToken, refresh);
    yield put(storeAuthToken(token));
    if (!refresh) yield call(loginSuccess);
    return token;
  } catch (e) {
    console.log(e);
    yield put(storeAuthToken(null));
    return null;
  }
}

function* authorizeLoop(storedToken) {
  let token = storedToken;
  while (true) {
    const refresh = token != null;
    token = yield call(authorize, refresh);
    if (token == null) return;

    const expiresInMS = token.expires_in * 1000;
    yield call(delay, expiresInMS);
  }
}

function* authentication() {
  const storedToken = yield select(state => state.auth.token);

  while (true) {
    if (!storedToken) yield take(LOGIN);

    const { signOutAction } = yield race({
      signOutAction: take(LOGOUT),
      authLoop: call(authorizeLoop, storedToken),
    });

    if (signOutAction) {
      yield put(storeAuthToken, null);
    }
  }
}

function* startLoggingOut() {
  yield put(resetNavigatorToRoute('Login'));
}

export default function* root() {
  yield fork(authentication);
  yield takeLatest(LOGOUT, startLoggingOut);
}

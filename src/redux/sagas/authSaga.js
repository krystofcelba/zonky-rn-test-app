import { delay } from 'redux-saga';
import { call, fork, put, race, select, take, takeLatest } from 'redux-saga/effects';

import { actions, LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE } from '../reducers/auth';
import * as API from './api';

import {
  actions as uiActions,
  getLoginScreenUsernameInputText,
  getLoginScreenPasswordInputText,
} from '../reducers/ui';

function* loginSuccess() {
  yield put(uiActions.resetNavigatorToRoute('Main'));
  yield put(uiActions.updateLoginScreenUsernameInput(''));
  yield put(uiActions.updateLoginScreenPasswordInput(''));
}

function* authorize(isUserLogged) {
  try {
    let token = null;
    if (!isUserLogged) {
      const username = yield select(getLoginScreenUsernameInputText);
      const password = yield select(getLoginScreenPasswordInputText);
      token = yield call(API.authorizeUser, username, password);
    } else {
      const oldToken = yield select(state => state.auth.token);
      token = yield call(API.refreshToken, oldToken);
    }
    yield put(actions.storeAuthToken(token));
    if (!isUserLogged) yield put(actions.loginSuccess());
    return token;
  } catch (e) {
    console.log(e);
    yield put(uiActions.showErrorAlert(e.response.data.error_description));
    yield put(actions.loginFailure(e));
    yield put(actions.logout());
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
      yield put(actions.storeAuthToken(null));
    }
  }
}

export default function* root() {
  yield fork(authenticationFlow);
  yield takeLatest(LOGIN_SUCCESS, loginSuccess);
}

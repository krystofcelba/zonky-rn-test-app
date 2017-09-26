import { delay } from 'redux-saga';
import { call, fork, put, race, select, take, takeLatest } from 'redux-saga/effects';

import { actions, LOGIN, LOGOUT, LOGIN_SUCCESS, getAuthToken } from '../reducers/auth';
import * as API from './api';

import * as Strings from '../../constants/strings';

import {
  uiActions,
  getLoginScreenUsernameInputText,
  getLoginScreenPasswordInputText,
} from '../reducers/ui';

export function* loginSuccess() {
  yield put(uiActions.resetNavigatorToRoute('Main'));
  yield put(uiActions.updateLoginScreenUsernameInput(''));
  yield put(uiActions.updateLoginScreenPasswordInput(''));
}

export function* authorize(isUserLogged) {
  let resp = null;
  if (isUserLogged) {
    const oldToken = yield select(getAuthToken);
    resp = yield call(API.refreshToken, oldToken);
  } else {
    const username = yield select(getLoginScreenUsernameInputText);
    const password = yield select(getLoginScreenPasswordInputText);
    resp = yield call(API.authorizeUser, username, password);
  }
  if (resp.ok) {
    const token = resp.data;
    yield put(actions.storeAuthToken(token));
    if (!isUserLogged) yield put(actions.loginSuccess());
    return token;
  }
  yield put(actions.storeAuthToken(null));
  yield put(
    uiActions.showErrorAlert(
      isUserLogged ? Strings.TOKEN_REFRESHING_ERROR_ALERT_TITLE : Strings.LOGIN_ERROR_ALERT_TITLE,
      Strings.errorMessageFormatter(resp.errorMessage),
    ),
  );
  if (!isUserLogged) yield put(actions.loginFailure());
  return null;
}

export function* tokenRefreshingLoop(storedToken) {
  let token = storedToken;
  while (true) {
    const isUserLogged = token != null;
    token = yield call(authorize, isUserLogged);
    console.log(token);
    if (token == null) return;

    const expiresInMs = token.expires_in * 1000;
    yield call(delay, expiresInMs);
  }
}

export function* authenticationFlow() {
  const storedToken = yield select(getAuthToken);

  while (true) {
    if (!storedToken) yield take(LOGIN);

    yield race({
      logoutAction: take(LOGOUT),
      authLoop: call(tokenRefreshingLoop, storedToken),
    });

    yield put(uiActions.resetNavigatorToRoute('Login'));
  }
}

export default function* root() {
  yield fork(authenticationFlow);
  yield takeLatest(LOGIN_SUCCESS, loginSuccess);
}

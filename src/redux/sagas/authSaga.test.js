import { select } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { authorize, authenticationFlow, loginSuccess } from './authSaga';
import {
  getAuthToken,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  STORE_AUTH_TOKEN,
} from '../reducers/auth';
import * as API from './api';
import * as Strings from '../../constants/strings';
import {
  uiActions,
  getLoginScreenUsernameInputText,
  getLoginScreenPasswordInputText,
  SHOW_ERROR_ALERT,
} from '../reducers/ui';

import reducers from '../reducers';

const storedToken = {
  access_token: 'c5f6b996-47aa-4c59-8fc7-8a03fcf5da9d',
  token_type: 'bearer',
  refresh_token: 'd33c18a7-cc94-4e35-9ac3-c67528a602f4',
  expires_in: 0.1,
  scope: 'SCOPE_APP_WEB',
};

it('success authorize with username and password', () =>
  expectSaga(authorize, false)
    .provide([
      [select(getLoginScreenUsernameInputText), 'test'],
      [select(getLoginScreenPasswordInputText), 'test'],
      [matchers.call.fn(API.authorizeUser), { ok: true, data: storedToken }],
    ])
    .put({ type: STORE_AUTH_TOKEN, token: storedToken })
    .put({ type: LOGIN_SUCCESS })
    .returns(storedToken)
    .run());

it('fails to authorize with username and password', () => {
  const errorMessage = 'Bad credentials';
  return expectSaga(authorize, false)
    .provide([
      [select(getLoginScreenUsernameInputText), 'bad'],
      [select(getLoginScreenPasswordInputText), 'bad'],
      [matchers.call.fn(API.authorizeUser), { ok: false, data: {}, errorMessage }],
    ])
    .put({ type: STORE_AUTH_TOKEN, token: null })
    .put({
      type: SHOW_ERROR_ALERT,
      title: Strings.LOGIN_ERROR_ALERT_TITLE,
      message: Strings.errorMessageFormatter(errorMessage),
      duration: 2000,
    })
    .put({ type: LOGIN_FAILURE })
    .returns(null)
    .run();
});

it('refresh auth token', () =>
  expectSaga(authorize, true)
    .provide([
      [select(getAuthToken), storedToken],
      [matchers.call.fn(API.refreshToken), { ok: true, data: storedToken }],
    ])
    .put({ type: STORE_AUTH_TOKEN, token: storedToken })
    .returns(storedToken)
    .run());

it('fails to refresh auth token', () => {
  const refreshToken = 'bad';
  const badStoredToken = { token: { refresh_token: refreshToken, scope: 'SCOPE_APP_WEB' } };
  const errorResp = { ok: false, data: {}, errorMessage: `Invalid access token: ${refreshToken}` };
  return expectSaga(authorize, true)
    .provide([
      [select(getAuthToken), badStoredToken],
      [matchers.call.fn(API.refreshToken), errorResp],
    ])
    .put({ type: STORE_AUTH_TOKEN, token: null })
    .put({
      type: SHOW_ERROR_ALERT,
      title: Strings.TOKEN_REFRESHING_ERROR_ALERT_TITLE,
      message: Strings.errorMessageFormatter(errorResp.errorMessage),
      duration: 2000,
    })
    .returns(null)
    .run();
});

it('runs authentication flow', () =>
  expectSaga(authenticationFlow)
    .withReducer(reducers)
    .provide([[matchers.call.fn(API.authorizeUser), { ok: true, data: storedToken }]])
    .dispatch({ type: LOGIN })
    .delay(100)
    .dispatch({ type: STORE_AUTH_TOKEN, token: null })
    .run(1000));

it('should reset navigator to main authenticated route, reset username and password', () => {
  testSaga(loginSuccess)
    .next()
    .put(uiActions.resetNavigatorToRoute('Main'))
    .next()
    .put(uiActions.updateLoginScreenUsernameInput(''))
    .next()
    .put(uiActions.updateLoginScreenPasswordInput(''))
    .next()
    .isDone();
});

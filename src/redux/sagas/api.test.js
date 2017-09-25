import { testSaga } from 'redux-saga-test-plan';

import * as API from './api';

const username = 'test';
const password = 'test';


it('calls requestAuthToken with username and password in form urlencoded POST body', () => {
  testSaga(API.authorizeUser, username, password)
    .next()
    .call(
      API.requestAuthToken,
      `username=${username}&password=${password}&grant_type=password&scope=SCOPE_APP_WEB`,
    )
    .next()
    .isDone();
});

const storedToken = {
  access_token: 'c5f6b996-47aa-4c59-8fc7-8a03fcf5da9d',
  token_type: 'bearer',
  refresh_token: 'd33c18a7-cc94-4e35-9ac3-c67528a602f4',
  expires_in: 299,
  scope: 'SCOPE_APP_WEB',
};

it('calls requestAuthToken with stored refresh_token and scope in form urlencoded POST body', () => {
  testSaga(API.refreshToken, storedToken)
    .next()
    .call(
      API.requestAuthToken,
      `grant_type=refresh_token&refresh_token=${storedToken.refresh_token}&scope=${storedToken.scope}`,
    )
    .next()
    .isDone();
});

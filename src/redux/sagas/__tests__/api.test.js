import axios from 'axios';
import { testSaga } from 'redux-saga-test-plan';

import * as API from '../api';

import { getAuthToken } from '../../reducers/auth';

const storedToken = {
  access_token: 'c5f6b996-47aa-4c59-8fc7-8a03fcf5da9d',
  token_type: 'bearer',
  refresh_token: 'd33c18a7-cc94-4e35-9ac3-c67528a602f4',
  expires_in: 299,
  scope: 'SCOPE_APP_WEB',
};

it('should call axois.get with absolute url, then return data from response', () => {
  const responseData = {};
  testSaga(API.get, '')
    .next()
    .call(axios.get, API.fullUriForPath(''), {})
    .next(API.handleSuccessResponse({ data: responseData }))
    .returns({ ok: true, data: responseData });
});

it('should call axois.post with absolute url and post body, then return data from response', () => {
  const responseData = {};
  testSaga(API.post, '', '')
    .next()
    .call(axios.post, API.fullUriForPath(''), '', {})
    .next(API.handleSuccessResponse({ data: responseData }))
    .returns({ ok: true, data: responseData });
});

it('should add auth token', () => {
  testSaga(API.authorizedGet, '')
    .next()
    .select(getAuthToken)
    .next(storedToken)
    .call(API.get, '', {
      headers: { Authorization: `Bearer ${storedToken.access_token}` },
    })
    .next()
    .isDone();
});


it('should post provided body to /oauth/token/ endpoint', () => {
  const body = '';
  testSaga(API.requestAuthToken, body)
    .next()
    .call(API.post, '/oauth/token', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic d2ViOndlYg==',
      },
    })
    .next()
    .isDone();
});

it('should call requestAuthToken with username and password in form urlencoded POST body', () => {
  const username = 'test';
  const password = 'test';
  testSaga(API.authorizeUser, username, password)
    .next()
    .call(
      API.requestAuthToken,
      `username=${username}&password=${password}&grant_type=password&scope=SCOPE_APP_WEB`,
    )
    .next()
    .isDone();
});

it('should call requestAuthToken with stored refresh_token and scope in form urlencoded POST body', () => {
  testSaga(API.refreshToken, storedToken)
    .next()
    .call(
      API.requestAuthToken,
      `grant_type=refresh_token&refresh_token=${storedToken.refresh_token}&scope=${storedToken.scope}`,
    )
    .next()
    .isDone();
});

it('should get marketplace endpoint with fields url parameter and pagination headers', () => {
  const page = 0;
  testSaga(API.fetchLoans, page)
    .next()
    .call(
      API.authorizedGet,
      '/loans/marketplace?fields=id,name,story,photos,interestRate,rating,termInMonths,amount,investmentsCount,deadline,remainingInvestment',
      { headers: { 'X-Page': page, 'X-Size': 20 } },
    )
    .next()
    .isDone();
});

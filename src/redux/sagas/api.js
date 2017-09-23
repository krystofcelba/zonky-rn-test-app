import { put, select } from 'redux-saga/effects';
import { API } from 'redux-saga-rest';

import { logout } from '../actions/auth';

const BASE_URL = 'https://private-anon-b35ae4e59e-zonky.apiary-mock.com';

function* authMiddleware(req, next) {
  // request middleware
  const authToken = yield select(state => state.auth.token);
  const headers = req.headers || new Headers();
  if (authToken !== null) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }
  // retrieve the response
  const res = yield next(new Request(req, { headers }));

  // response middleware
  if (res.status === 401) {
    yield put(logout());
  }

  // return the response
  return res;
}

const api = new API(BASE_URL).use(authMiddleware);

const tokenRequestHeaders = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json',
  Authorization: 'Basic d2ViOndlYg==',
});

function* authorizeUser(username, password) {
  const body = `username=${username}&password=${password}&grant_type=password&scope=SCOPE_APP_WEB`;
  const resp = yield api.post('/oauth/token', null, { headers: tokenRequestHeaders, body });
  if (resp.ok) {
    return yield resp.json();
  }
  throw resp;
}

function* refreshToken(token) {
  const body = `grant_type=refresh_token&refresh_token=${token.refresh_token}&scope=${token.scope}`;
  const resp = yield api.post('/oauth/token', null, { headers: tokenRequestHeaders, body });
  if (resp.ok) {
    return yield resp.json();
  }
  throw resp;
}

export default { authorizeUser, refreshToken };

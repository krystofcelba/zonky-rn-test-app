import { put, select, call } from 'redux-saga/effects';
import { API } from 'redux-saga-rest';

import { logout } from '../actions/auth';

// const BASE_URL = 'https://private-anon-b35ae4e59e-zonky.apiary-mock.com';
const BASE_URL = 'https://api.zonky.cz';

function* authMiddleware(req, next) {
  const authToken = yield select(state => state.auth.token);
  const headers = req.headers || new Headers();

  if (authToken !== null) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }
  const res = yield next(new Request(req, { headers }));

  if (res.status === 401) {
    yield put(logout());
  }
  return res;
}

const api = new API(BASE_URL).use(authMiddleware);

function* requestAuthToken(body) {
  const resp = yield api.post('/oauth/token', null, {
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: 'Basic d2ViOndlYg==',
    }),
    body,
  });

  if (resp.ok) {
    return yield resp.json();
  }
  throw yield resp.json();
}

function* authorizeUser(username, password) {
  const body = `username=${username}&password=${password}&grant_type=password&scope=SCOPE_APP_WEB`;
  return yield call(requestAuthToken, body);
}

function* refreshToken(token) {
  const body = `grant_type=refresh_token&refresh_token=${token.refresh_token}&scope=${token.scope}`;
  return yield call(requestAuthToken, body);
}

export default { authorizeUser, refreshToken };

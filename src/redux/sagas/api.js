import { put, select, call } from 'redux-saga/effects';
import { API } from 'redux-saga-rest';

import { logout } from '../actions/auth';

// const BASE_URL = 'https://private-anon-b35ae4e59e-zonky.apiary-mock.com';
const BASE_URL = 'https://api.zonky.cz';
const PAGE_SIZE = 20;

type Photo = { name: string, url: string };

export type Loan = {
  id: number,
  name: string,
  story?: string,
  photos: Photo[],
  termInMonths: number,
  interestRate: number,
  rating: string,
  amount: number,
};

function* authMiddleware(req, next) {
  const token = yield select(state => state.auth.token);
  const headers = req.headers || new Headers();

  if (token !== null) {
    headers.set('Authorization', `Bearer ${token.access_token}`);
  }
  const res = yield next(new Request(req, { headers }));

  if (res.status === 401) {
    yield put(logout());
  }
  return res;
}

const api = new API(BASE_URL).use(authMiddleware);

function* requestAuthToken(body) {
  const resp = yield api.post('/oauth/token', body, {
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: 'Basic d2ViOndlYg==',
    }),
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

function* fetchLoans(page: number): Loan[] {
  const resp = yield api.get(
    '/loans/marketplace?fields=id,name,story,photos,interestRate,rating,termInMonths,amount',
    null,
    {
      headers: new Headers({
        'X-Page': page,
        'X-Size': PAGE_SIZE,
      }),
    },
  );

  if (resp.ok) {
    return yield resp.json();
  }
  throw yield resp.json();
}

export const fullUriForPath = path => `${BASE_URL}${path}`;

export default { authorizeUser, refreshToken, fetchLoans };

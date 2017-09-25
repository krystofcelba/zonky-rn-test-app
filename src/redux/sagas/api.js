import { put, select, call } from 'redux-saga/effects';
import axios from 'axios';

import { logout } from '../actions/auth';

// const BASE_URL = 'https://private-anon-b35ae4e59e-zonky.apiary-mock.com';
const BASE_URL = 'https://api.zonky.cz';
const PAGE_SIZE = 10;

const zonkyApi = axios.create({ baseURL: BASE_URL });

type Photo = { name: string, url: string };

export type Loan = {
  id: number,
  name: string,
  story?: string,
  photos: Photo[],
  photoUri?: string,
  termInMonths: number,
  interestRate: number,
  rating: string,
  amount: number,
  investmentsCount: number,
  deadline: string,
  remainingInvestment: number,
};

export type AuthToken = {
  access_token: string,
  token_type: string,
  refresh_token: string,
  expires_in: number,
  scope: string,
};

function* authorizedGet(url, config = {}) {
  const token = yield select(state => state.auth.token);
  let headers = config.headers || {};
  if (token !== null) {
    headers = { ...headers, Authorization: `Bearer ${token.access_token}` };
  } else {
    put(logout);
  }
  const resp = yield call(zonkyApi.get, url, { ...config, headers });
  return resp;
}

export function* requestAuthToken(body) {
  const resp = yield call(zonkyApi.post, '/oauth/token', body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: 'Basic d2ViOndlYg==',
    },
  });
  return resp.data;
}

export function* authorizeUser(username: string, password: string) {
  const body = `username=${username}&password=${password}&grant_type=password&scope=SCOPE_APP_WEB`;
  return yield call(requestAuthToken, body);
}

export function* refreshToken(storedToken: AuthToken) {
  const body = `grant_type=refresh_token&refresh_token=${storedToken.refresh_token}&scope=${storedToken.scope}`;
  return yield call(requestAuthToken, body);
}

export function* fetchLoans(page: number) {
  const resp = yield call(
    // We actually don't have to call this endpoint with authorization I do it only for example.
    authorizedGet,
    '/loans/marketplace?fields=id,name,story,photos,interestRate,rating,termInMonths,amount,investmentsCount,deadline,remainingInvestment',
    { headers: { 'X-Page': page, 'X-Size': PAGE_SIZE } },
  );
  return resp.data;
}

export const fullUriForPath = path => `${BASE_URL}${path}`;

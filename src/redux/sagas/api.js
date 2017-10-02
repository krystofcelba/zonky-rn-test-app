import axios from 'axios';
import { call, select } from 'redux-saga/effects';

import { getAuthToken } from '../reducers/auth';

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

export const fullUriForPath = path => `${BASE_URL}${path}`;

export const handleErrorResponse = (e) => {
  const response = e.response || { data: {} };
  const errorMessage = response.data.error_description || e.request.responseText;
  return { ok: false, data: response.data, errorMessage };
};

export const handleSuccessResponse = resp => ({ ok: true, data: resp.data });

export function* get(path, config = {}) {
  try {
    const resp = yield call(axios.get, fullUriForPath(path), config);
    return handleSuccessResponse(resp);
  } catch (e) {
    return handleErrorResponse(e);
  }
}

export function* post(path, data, config = {}) {
  try {
    const resp = yield call(axios.post, fullUriForPath(path), data, config);
    return handleSuccessResponse(resp);
  } catch (e) {
    return handleErrorResponse(e);
  }
}

export function* authorizedGet(path, config = {}) {
  const token = yield select(getAuthToken);
  const accessToken = token && token.access_token;
  const headers = { ...(config.headers || {}), Authorization: `Bearer ${accessToken}` };
  return yield call(get, path, { ...config, headers });
}

export function* requestAuthToken(body: string) {
  return yield call(post, '/oauth/token', body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic d2ViOndlYg==',
    },
  });
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
  return yield call(
    // We actually don't have to call this endpoint with authorization I do it only for example.
    authorizedGet,
    '/loans/marketplace?fields=id,name,story,photos,interestRate,rating,termInMonths,amount,investmentsCount,deadline,remainingInvestment',
    { headers: { 'X-Page': page, 'X-Size': PAGE_SIZE } },
  );
}

import { put, select } from 'redux-saga/effects';
import { API } from 'redux-saga-rest';

import { logout } from '../actions/auth';

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

export default new API('https://private-anon-b35ae4e59e-zonky.apiary-mock.com').use(authMiddleware);

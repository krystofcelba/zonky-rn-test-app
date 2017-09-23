import { put, takeLatest } from 'redux-saga/effects';
import { saveAuthToken, resetNavigatorToRoute } from '../actions/auth';
import { AUTHENTICATE, DEAUTHENTICATE } from '../actions/actionTypes';

function* authenticateFlow() {
  yield put(saveAuthToken('xxx'));
  yield put(resetNavigatorToRoute('Main'));
}

function* deauthenticateFlow() {
  yield put(resetNavigatorToRoute('Login'));
}

export default function* root() {
  yield takeLatest(AUTHENTICATE, authenticateFlow);
  yield takeLatest(DEAUTHENTICATE, deauthenticateFlow);
}

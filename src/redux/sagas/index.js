import { all, call } from 'redux-saga/effects';

import auth from './authSaga';

export default function* rootSaga() {
  yield all([call(auth)]);
}

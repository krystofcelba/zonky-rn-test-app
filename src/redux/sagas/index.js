import { all, call } from 'redux-saga/effects';

import auth from './authSaga';
import loans from './loansSaga';
import ui from './uiSaga';

export default function* rootSaga() {
  yield all([call(auth), call(loans), call(ui)]);
}

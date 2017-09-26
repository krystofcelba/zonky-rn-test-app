import { delay } from 'redux-saga';
import { call, put, actionChannel, take, fork, race } from 'redux-saga/effects';

import { SHOW_ERROR_ALERT, HIDE_ERROR_ALERT, uiActions } from '../reducers/ui';

function* errorAlertFlow() {
  const requestChan = yield actionChannel(SHOW_ERROR_ALERT);
  while (true) {
    const { title, message } = yield take(requestChan);
    yield put(uiActions.setErrorAlertVisible(true, title, message));
    yield race({
      hideErrorAlertAction: take(HIDE_ERROR_ALERT),
      delayCall: call(delay, 1000),
    });

    yield put(uiActions.setErrorAlertVisible(false, ''));
  }
}

export default function* root() {
  yield fork(errorAlertFlow);
}

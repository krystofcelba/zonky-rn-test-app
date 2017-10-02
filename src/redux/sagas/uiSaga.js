import { delay } from 'redux-saga';
import { call, put, actionChannel, take, fork, race } from 'redux-saga/effects';

import { uiActions, SHOW_ERROR_ALERT, HIDE_ERROR_ALERT } from '../reducers/ui';

export function* errorAlertFlow() {
  const requestChan = yield actionChannel(SHOW_ERROR_ALERT);
  while (true) {
    const { title, message, duration } = yield take(requestChan);
    yield put(uiActions.setErrorAlertVisible(true, title, message));
    yield race({
      hideErrorAlertAction: take(HIDE_ERROR_ALERT),
      delayCall: call(delay, duration),
    });

    yield put(uiActions.setErrorAlertVisible(false));
  }
}

export default function* root() {
  yield fork(errorAlertFlow);
}

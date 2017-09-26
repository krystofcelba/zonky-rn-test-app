import { delay } from 'redux-saga';
import { call, put, actionChannel, take, fork, race } from 'redux-saga/effects';

import { SHOW_ERROR_ALERT, HIDE_ERROR_ALERT, actions } from '../reducers/ui';

function* errorAlertFlow() {
  const requestChan = yield actionChannel(SHOW_ERROR_ALERT);
  while (true) {
    const { message } = yield take(requestChan);
    yield put(actions.setErrorAlertVisible(true, message));
    yield race({
      hideErrorAlertAction: take(HIDE_ERROR_ALERT),
      delayCall: call(delay, 1000),
    });

    yield put(actions.setErrorAlertVisible(false, ''));
  }
}

export default function* root() {
  yield fork(errorAlertFlow);
}

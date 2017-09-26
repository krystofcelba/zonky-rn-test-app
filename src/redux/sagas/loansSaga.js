import { call, put, actionChannel, fork, take, select } from 'redux-saga/effects';

import { actions, getNextLoansPageNum, FETCH_NEXT_LOANS_PAGE } from '../reducers/loans';
import { uiActions } from '../reducers/ui';
import * as API from './api';
import * as Strings from '../../constants/strings';

export function* loansFetchingFlow() {
  const requestChan = yield actionChannel(FETCH_NEXT_LOANS_PAGE);
  while (true) {
    yield take(requestChan);

    const nextPage = yield select(getNextLoansPageNum);

    const resp = yield call(API.fetchLoans, nextPage);
    if (resp.ok) {
      yield put(actions.fetchNextLoansPageSuccess(resp.data, nextPage));
    } else {
      yield put(actions.fetchNextLoansPageFailed());
      yield put(
        uiActions.showErrorAlert(
          Strings.FETCHING_LOANS_ERROR_ALERT_TITLE,
          Strings.errorMessageFormatter(resp.errorMessage),
          
        ),
      );
    }
  }
}

export default function* root() {
  yield fork(loansFetchingFlow);
}

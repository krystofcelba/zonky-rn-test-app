import { call, put, select, takeEvery } from 'redux-saga/effects';

import { actions, FETCH_NEXT_LOANS_PAGE } from '../reducers/loans';
import { uiActions } from '../reducers/ui';
import * as API from './api';
import * as Strings from '../../constants/strings';

function* fetchNextLoansPage() {
  const currentPage = yield select(state => state.loans.page);
  const nextPage = currentPage + 1;

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

export default function* root() {
  yield takeEvery(FETCH_NEXT_LOANS_PAGE, fetchNextLoansPage);
}

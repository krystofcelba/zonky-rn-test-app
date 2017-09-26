import { call, put, select, takeEvery } from 'redux-saga/effects';

import { actions, FETCH_NEXT_LOANS_PAGE } from '../reducers/loans';
import * as API from './api';

function* fetchNextLoansPage() {
  const currentPage = yield select(state => state.loans.page);
  const nextPage = currentPage + 1;
  try {
    const resp = yield call(API.fetchLoans, nextPage);
    yield put(actions.fetchNextLoansPageSuccess(resp, nextPage));
  } catch (e) {
    console.log(e);
    yield put(actions.fetchNextLoansPageFailed(e));
  }
}

export default function* root() {
  yield takeEvery(FETCH_NEXT_LOANS_PAGE, fetchNextLoansPage);
}

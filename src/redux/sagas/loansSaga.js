import { takeEvery, call, select, put } from 'redux-saga/effects';
import {
  FETCH_NEXT_LOANS_PAGE,
  fetchNextLoansPageSuccess,
  fetchNextLoansPageFailed,
} from '../actions/loans';
import * as API from './api';

function* fetchNextLoansPage() {
  const currentPage = yield select(state => state.loans.page);
  const nextPage = currentPage + 1;
  try {
    const loans = yield call(API.fetchLoans, nextPage);
    yield put(fetchNextLoansPageSuccess(loans, nextPage));
  } catch (e) {
    console.log(e);
    yield put(fetchNextLoansPageFailed(e));
  }
}

export default function* root() {
  yield takeEvery(FETCH_NEXT_LOANS_PAGE, fetchNextLoansPage);
}

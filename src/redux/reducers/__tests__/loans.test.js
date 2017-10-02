import { Reducer } from 'redux-testkit';

import { uniq } from '../../../lib/utils';

import loansReducer, { FETCH_NEXT_LOANS_PAGE, FETCH_NEXT_LOANS_PAGE_SUCCESS, FETCH_NEXT_LOANS_PAGE_FAILED } from '../loans';

const initialState = { loansById: [], loans: {}, page: -1, loading: false };

const loan = {
  id: 0,
  name: '',
  story: '',
  photos: [{ name: '', url: '' }],
  termInMonths: 0,
  interestRate: 0,
  rating: '',
  amount: 0,
  remainingInvestment: 0,
  published: true,
  deadline: '',
  investmentsCount: 0,
};

const someLoans = Array.from(Array(10), (_, i) => ({ ...loan, id: i }));

describe('loans reducer', () => {
  it('should handle initial state', () => {
    expect(loansReducer(undefined, '@@INIT')).toEqual(initialState);
  });

  it('should handle FETCH_NEXT_LOANS_PAGE', () => {
    const action = { type: FETCH_NEXT_LOANS_PAGE };
    const changes = { loading: true };
    Reducer(loansReducer)
      .expect(action)
      .toChangeInState(changes);
  });

  it('should handle FETCH_NEXT_LOANS_PAGE_SUCCESS', () => {
    const action = {
      type: FETCH_NEXT_LOANS_PAGE_SUCCESS,
      loans: someLoans,
      page: 0,
    };
    const result = {
      loansById: action.loans.map(next => next.id),
      loans: { ...action.loans.reduce((map, next) => ({ ...map, [next.id]: next }), {}) },
      page: 0,
      loading: false,
    };
    Reducer(loansReducer)
      .expect(action)
      .toReturnState(result);
  });

  it('should handle FETCH_NEXT_LOANS_PAGE_SUCCESS with duplicates', () => {
    const action = {
      type: FETCH_NEXT_LOANS_PAGE_SUCCESS,
      loans: someLoans,
      page: 1,
    };
    const result = {
      loansById: uniq([...[5, 8], ...action.loans.map(next => next.id)]),
      loans: { ...action.loans.reduce((map, next) => ({ ...map, [next.id]: next }), {}) },
      page: 1,
      loading: false,
    };
    Reducer(loansReducer)
      .withState({
        loansById: [5, 8],
        loans: { 5: { ...loan, id: 0 }, 8: { ...loan, id: 1 } },
        page: 0,
        loading: false,
      })
      .expect(action)
      .toReturnState(result);
  });

  it('should handle FETCH_NEXT_LOANS_PAGE_FAILED', () => {
    const action = { type: FETCH_NEXT_LOANS_PAGE_FAILED };
    const changes = { loading: false };
    Reducer(loansReducer)
      .expect(action)
      .toChangeInState(changes);
  });
});

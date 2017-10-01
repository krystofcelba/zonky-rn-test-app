import { fullUriForPath } from '../sagas/api';
import { uniq } from '../../lib/utils';

export const FETCH_NEXT_LOANS_PAGE = 'FETCH_NEXT_LOANS_PAGE';
export const FETCH_NEXT_LOANS_PAGE_SUCCESS = 'FETCH_NEXT_LOANS_PAGE_SUCCESS';
export const FETCH_NEXT_LOANS_PAGE_FAILED = 'FETCH_NEXT_LOANS_PAGE_FAILED';

export type LoanAction =
  | { type: typeof FETCH_NEXT_LOANS_PAGE }
  | { type: typeof FETCH_NEXT_LOANS_PAGE_SUCCESS, loans: [], page: number }
  | { type: typeof FETCH_NEXT_LOANS_PAGE_FAILED };

const loansReducer = (
  state = { loansById: [], loans: {}, page: -1, loading: false },
  action: LoanAction,
) => {
  switch (action.type) {
    case FETCH_NEXT_LOANS_PAGE: {
      return { ...state, loading: true };
    }
    case FETCH_NEXT_LOANS_PAGE_SUCCESS: {
      return {
        ...state,
        loansById: uniq([...state.loansById, ...action.loans.map(next => next.id)]),
        loans: {
          ...state.loans,
          ...action.loans.reduce(
            (map, next) => ({
              ...map,
              [next.id]: { ...next, photoUri: fullUriForPath(next.photos[0].url) },
            }),
            {},
          ),
        },
        page: action.page,
        loading: false,
      };
    }
    case FETCH_NEXT_LOANS_PAGE_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default loansReducer;

export const actions = {
  fetchNextLoansPage: (): LoanAction => ({
    type: FETCH_NEXT_LOANS_PAGE,
  }),
  fetchNextLoansPageSuccess: (loans: [], page: number): LoanAction => ({
    type: FETCH_NEXT_LOANS_PAGE_SUCCESS,
    loans,
    page,
  }),
  fetchNextLoansPageFailed: (): LoanAction => ({
    type: FETCH_NEXT_LOANS_PAGE_FAILED,
  }),
};

export const getNextLoansPageNum = state => state.loans.page + 1;

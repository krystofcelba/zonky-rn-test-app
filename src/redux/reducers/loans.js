import { FETCH_NEXT_LOANS_PAGE_SUCCESS } from '../actions/loans';

const loansReducer = (state = { loans: {}, page: -1, fetchingNow: false }, action) => {
  switch (action.type) {
    case FETCH_NEXT_LOANS_PAGE_SUCCESS: {
      return {
        ...state,
        loans: {
          ...state.loans,
          ...action.loans.reduce((map, next) => ({ ...map, [next.id]: next }), {}),
        },
        page: action.page,
      };
    }
    default: {
      return state;
    }
  }
};

export default loansReducer;

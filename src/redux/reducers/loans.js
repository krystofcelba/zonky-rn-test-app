import { FETCH_NEXT_LOANS_PAGE_SUCCESS, FETCH_NEXT_LOANS_PAGE } from '../actions/loans';

const loansReducer = (state = { loans: {}, page: -1, loading: false }, action) => {
  switch (action.type) {
    case FETCH_NEXT_LOANS_PAGE: {
      return { ...state, loading: true };
    }
    case FETCH_NEXT_LOANS_PAGE_SUCCESS: {
      return {
        ...state,
        loans: {
          ...state.loans,
          ...action.loans.reduce((map, next) => ({ ...map, [next.id]: next }), {}),
        },
        page: action.page,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default loansReducer;

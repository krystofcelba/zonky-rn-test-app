export const FETCH_NEXT_LOANS_PAGE = 'FETCH_NEXT_LOANS_PAGE';
export const FETCH_NEXT_LOANS_PAGE_SUCCESS = 'FETCH_NEXT_LOANS_PAGE_SUCCESS';
export const FETCH_NEXT_LOANS_PAGE_FAILED = 'FETCH_NEXT_LOANS_PAGE_FAILED';

export type LoanAction =
  | { type: typeof FETCH_NEXT_LOANS_PAGE }
  | { type: typeof FETCH_NEXT_LOANS_PAGE_SUCCESS, loans: [], page: number }
  | { type: typeof FETCH_NEXT_LOANS_PAGE_FAILED, error: {} };

export const fetchNextLoansPage = (): LoanAction => ({
  type: FETCH_NEXT_LOANS_PAGE,
});

export const fetchNextLoansPageSuccess = (loans: [], page: number): LoanAction => ({
  type: FETCH_NEXT_LOANS_PAGE_SUCCESS,
  loans,
  page,
});

export const fetchNextLoansPageFailed = (error: {}): LoanAction => ({
  type: FETCH_NEXT_LOANS_PAGE_FAILED,
  error,
});

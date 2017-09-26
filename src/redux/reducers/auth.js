import type { AuthToken } from '../sagas/api';

export const LOGIN_SUCCESS = 'LOGIN_SUCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const STORE_AUTH_TOKEN = 'STORE_AUTH_TOKEN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export type AuthAction =
  | {
      type: typeof LOGIN_SUCCESS,
    }
  | {
      type: typeof LOGIN_FAILURE,
      error: {},
    }
  | { type: typeof LOGIN }
  | { type: typeof LOGOUT }
  | { type: typeof STORE_AUTH_TOKEN, token: AuthToken | null };

const authReducer = (
  state = {
    token: null,
  },
  action,
) => {
  switch (action.type) {
    case STORE_AUTH_TOKEN: {
      return { ...state, token: action.token };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;

export const actions = {
  login: (): AuthAction => ({
    type: LOGIN,
  }),
  loginSuccess: (): AuthAction => ({
    type: LOGIN_SUCCESS,
  }),
  loginFailure: (error: {}): AuthAction => ({
    type: LOGIN_FAILURE,
    error,
  }),
  logout: (): AuthAction => ({
    type: LOGOUT,
  }),
  storeAuthToken: (token: AuthToken | null): AuthAction => ({
    type: STORE_AUTH_TOKEN,
    token,
  }),
};

export const getAuthToken = state => state.auth.token;

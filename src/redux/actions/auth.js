/* @flow */
import { NavigationActions } from 'react-navigation';
import type { NavigationResetAction } from 'react-navigation/src/TypeDefinition';

export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const LOGIN_SUCCESS = 'LOGIN_SUCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const STORE_AUTH_TOKEN = 'STORE_AUTH_TOKEN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export type AuthAction =
  | { type: typeof UPDATE_USERNAME, username: string }
  | { type: typeof UPDATE_PASSWORD, password: string }
  | {
      type: typeof LOGIN_SUCCESS,
      token: {},
    }
  | {
      type: typeof LOGIN_FAILURE,
    }
  | { type: typeof LOGIN }
  | { type: typeof LOGOUT }
  | { type: typeof STORE_AUTH_TOKEN, token: {} | null };

export const updateUsername = (username: string): AuthAction => ({
  type: UPDATE_USERNAME,
  username,
});

export const updatePassword = (password: string): AuthAction => ({
  type: UPDATE_PASSWORD,
  password,
});

export const loginSuccess = (token: {}): AuthAction => ({
  type: LOGIN_SUCCESS,
  token,
});

export const loginFailure = (): AuthAction => ({
  type: LOGIN_FAILURE,
});

export const login = (): AuthAction => ({
  type: LOGIN,
});

export const logout = (): AuthAction => ({
  type: LOGOUT,
});

export const storeAuthToken = (token: {} | null): AuthAction => ({
  type: STORE_AUTH_TOKEN,
  token,
});

export const resetNavigatorToRoute = (routeName: string): NavigationResetAction =>
  NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })],
  });

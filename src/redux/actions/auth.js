/* @flow */
import { NavigationActions } from 'react-navigation';
import type { NavigationResetAction } from 'react-navigation/src/TypeDefinition';

import { SAVE_AUTH_TOKEN, AUTHENTICATE, DEAUTHENTICATE } from './actionTypes';

export type SaveAuthTokenAction = {
  type: SAVE_AUTH_TOKEN,
  token: string,
};

export type AuthenticateAction = {
  type: AUTHENTICATE,
};

export type DeauthenticateAction = {
  type: DEAUTHENTICATE,
};

export type AuthAction = AuthenticateAction | DeauthenticateAction | SaveAuthTokenAction;

export const saveAuthToken = (token: string): SaveAuthTokenAction => ({
  type: SAVE_AUTH_TOKEN,
  token,
});

export const authenticate = (): AuthenticateAction => ({
  type: AUTHENTICATE,
});

export const deauthenticate = (): DeauthenticateAction => ({
  type: DEAUTHENTICATE,
});

export const resetNavigatorToRoute = (routeName: string): NavigationResetAction =>
  NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })],
  });

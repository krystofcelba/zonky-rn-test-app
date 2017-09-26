import { NavigationActions } from 'react-navigation';
import type { NavigationResetAction } from 'react-navigation/src/TypeDefinition';

import { DEV_ZONKY_PASSWORD, DEV_ZONKY_USERNAME } from '../../constants/config';

export const UPDATE_LOGIN_SCREEN_USERNAME_INPUT_TEXT = 'UPDATE_LOGIN_SCREEN_USERNAME_INPUT_TEXT';
export const UPDATE_LOGIN_SCREEN_PASSWORD_INPUT_TEXT = 'UPDATE_LOGIN_SCREEN_PASSWORD_INPUT_TEXT';
export const SET_ERROR_ALERT_VISIBLE = 'SET_ERROR_ALERT_VISIBLE';
export const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';
export const HIDE_ERROR_ALERT = 'HIDE_ERROR_ALERT';

export type UIAction =
  | { type: typeof SET_ERROR_ALERT_VISIBLE, visible: boolean, title: string, message: string }
  | { type: typeof SHOW_ERROR_ALERT, title: string, message: string, duration?: number }
  | { type: typeof HIDE_ERROR_ALERT }
  | { type: typeof UPDATE_LOGIN_SCREEN_USERNAME_INPUT_TEXT, text: string }
  | { type: typeof UPDATE_LOGIN_SCREEN_PASSWORD_INPUT_TEXT, text: string };

const uiReducer = (
  state = {
    loginScreen: { usernameInputText: DEV_ZONKY_USERNAME, passwordInputText: DEV_ZONKY_PASSWORD },
    global: { errorAlertVisible: false, errorAlertTitle: '', errorAlertMessage: '' },
  },
  action: UIAction,
) => {
  switch (action.type) {
    case UPDATE_LOGIN_SCREEN_USERNAME_INPUT_TEXT: {
      return { ...state, loginScreen: { ...state.loginScreen, usernameInputText: action.text } };
    }
    case UPDATE_LOGIN_SCREEN_PASSWORD_INPUT_TEXT: {
      return { ...state, loginScreen: { ...state.loginScreen, passwordInputText: action.text } };
    }
    case SET_ERROR_ALERT_VISIBLE: {
      return {
        ...state,
        global: {
          ...state.global,
          errorAlertVisible: action.visible,
          errorAlertTitle: action.title || '',
          errorAlertMessage: action.message || '',
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default uiReducer;

export const uiActions = {
  setErrorAlertVisible: (visible: boolean, title: string, message: string) => ({
    type: SET_ERROR_ALERT_VISIBLE,
    visible,
    title,
    message,
  }),
  showErrorAlert: (title: string, message: string, duration?: number = 2000) => ({
    type: SHOW_ERROR_ALERT,
    title,
    message,
    duration,
  }),
  hideErrorAlert: () => ({ type: HIDE_ERROR_ALERT }),
  updateLoginScreenUsernameInput: (text: string) => ({
    type: UPDATE_LOGIN_SCREEN_USERNAME_INPUT_TEXT,
    text,
  }),
  updateLoginScreenPasswordInput: (text: string) => ({
    type: UPDATE_LOGIN_SCREEN_PASSWORD_INPUT_TEXT,
    text,
  }),
  resetNavigatorToRoute: (routeName: string): NavigationResetAction =>
    NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    }),
};

export const getLoginScreenUsernameInputText = state => state.ui.loginScreen.usernameInputText;
export const getLoginScreenPasswordInputText = state => state.ui.loginScreen.passwordInputText;

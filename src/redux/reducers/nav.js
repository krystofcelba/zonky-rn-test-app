/* import { combineReducers } from 'redux';
import type { NavigationAction } from 'react-navigation/src/TypeDefinition';

import { SWITCH_ROOT_NAVIGATOR } from '../actions/actionTypes';
import type { NavAction } from '../actions/nav';

import { RootAppNavigator } from '../../navigators/AppNavigator';
import { MainNavigator } from '../../navigators/MainNavigator';
import { LoginNavigator } from '../../navigators/LoginNavigator';

const firstAction = RootAppNavigator.router.getActionForPathAndParams('Login');

const rootNavReducer = (
  state = RootAppNavigator.router.getStateForAction(firstAction),
  action: NavigationAction | NavAction,
) => {
  console.log(action.type);
  if (action.type === SWITCH_ROOT_NAVIGATOR) {
    return {
      routes: [{ routeName: action.navigatorName, key: `${action.navigatorName}_key` }],
      index: 0,
    };
  }
  return RootAppNavigator.router.getStateForAction(action, state) || state;
};
*/

import { AppNavigator } from '../../navigators/AppNavigator';

export default (state, action) => AppNavigator.router.getStateForAction(action, state) || state;

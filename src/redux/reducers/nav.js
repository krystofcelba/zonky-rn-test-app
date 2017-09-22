import { AppNavigator } from '../../containers/AppNavigator';

const mainAction = AppNavigator.router.getActionForPathAndParams('Main');

const initialNavState = AppNavigator.router.getStateForAction(mainAction);

const navReducer = (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default navReducer;

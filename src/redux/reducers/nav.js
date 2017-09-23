import { AppNavigator } from '../../navigators/AppNavigator';

export default (state, action) => AppNavigator.router.getStateForAction(action, state) || state;

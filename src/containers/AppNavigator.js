/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import MainScreen from './MainScreen';

export const AppNavigator = StackNavigator({
  Main: { screen: MainScreen },
});

type Props = {
  dispatch: (action: {}) => {},
  nav: {},
};

const AppWithNavigationState = ({ dispatch, nav }: Props) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);

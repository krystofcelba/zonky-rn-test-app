/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Main from '../containers/MainScreen';
import Login from '../containers/LoginScreen';

export const AppNavigator = StackNavigator(
  {
    Login: { screen: Login },
    Main: { screen: Main },
  },
  { initialRouteName: 'Login' },
);

type Props = {
  dispatch: (action: {}) => {},
  nav: {},
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(({ dispatch, nav }: Props) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
));

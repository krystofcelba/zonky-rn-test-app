/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Main from '../containers/MainScreen';
import Login from '../containers/LoginScreen';
import LoanDetail from '../containers/LoanDetailScreen';

const mapNavigationStateParamsToProps = ScreenComponent =>
  class extends React.PureComponent {
    static navigationOptions = ScreenComponent.navigationOptions;
    render() {
      // eslint-disable-next-line react/prop-types
      const { params } = this.props.navigation.state;
      return <ScreenComponent {...this.props} {...params} />;
    }
  };

export const AppNavigator = StackNavigator(
  {
    Login: { screen: Login },
    Main: { screen: Main },
    LoanDetail: { screen: mapNavigationStateParamsToProps(LoanDetail) },
  },
  { initialRouteName: 'Login', header: null },
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

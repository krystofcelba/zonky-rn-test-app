/* @flow */
import React from 'react';
import { Provider } from 'react-redux';
import AppWithNavigationState from './containers/AppNavigator';

import store from './redux/store';

const App = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

export default App;

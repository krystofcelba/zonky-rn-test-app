/* @flow */
import React from 'react';
import { Provider } from 'react-redux';
import RootAppNavigator from './navigators/AppNavigator';

import configureStore from './redux/store';

class App extends React.Component {
  store = configureStore();

  render() {
    return (
      <Provider store={this.store}>
        <RootAppNavigator />
      </Provider>
    );
  }
}

export default App;

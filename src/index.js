/* @flow */
import React from 'react';
import { Provider } from 'react-redux';

import RootAppNavigator from './navigators/AppNavigator';
import WithDropdownAlert from './containers/WithDropdownAlert';
import configureStore from './redux/store';

class App extends React.Component {
  _store = configureStore();

  render() {
    return (
      <Provider store={this._store}>
        <WithDropdownAlert>
          <RootAppNavigator />
        </WithDropdownAlert>
      </Provider>
    );
  }
}

export default App;

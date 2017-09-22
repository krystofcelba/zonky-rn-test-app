import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import App from './src';

class ZonkyTestApp extends Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('ZonkyTestApp', () => ZonkyTestApp);

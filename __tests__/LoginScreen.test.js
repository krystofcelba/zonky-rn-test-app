import 'react-native';
import React from 'react';
import LoginScreen from '../src/containers/LoginScreen';
import configureStore from '../src/redux/store';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<LoginScreen store={configureStore()} />).toJSON();
  expect(tree).toMatchSnapshot();
});

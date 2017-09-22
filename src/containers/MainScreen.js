/* @flow */
import React from 'react';
import { Screen, Text } from '@shoutem/ui';

const MainScreen = () => (
  <Screen>
    <Text>It works!</Text>
  </Screen>
);

MainScreen.navigationOptions = {
  title: 'Main Screen',
};

export default MainScreen;

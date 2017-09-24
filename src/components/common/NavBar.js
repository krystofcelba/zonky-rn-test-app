import React from 'react';
import type {
  NavigationScreenProp,
  NavigationRoute,
  NavigationAction,
} from 'react-navigation/src/TypeDefinition';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from 'react-native-elements';

const NavBar = ({
  title,
  showBackButton = true,
  navigation,
}: {
  title: string,
  showBackButton: boolean,
  navigation: NavigationScreenProp<NavigationRoute, NavigationAction>,
}) => (
  <Header
    statusBarProps={{ barStyle: 'light-content' }}
    backgroundColor="#42b2bd"
    leftComponent={
      showBackButton ? (
        <Icon name="ios-arrow-back" size={30} color="white" onPress={() => navigation.goBack} />
      ) : null
    }
    centerComponent={{ text: title, style: { color: '#fff' } }}
  />
);

export default NavBar;

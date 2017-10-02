import React from 'react';
import type {
  NavigationScreenProp,
  NavigationRoute,
  NavigationAction,
} from 'react-navigation/src/TypeDefinition';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from 'react-native-elements';

import * as Strings from '../../constants/strings';
import * as Colors from '../../constants/colors';

const NavBar = ({
  title = Strings.NAVBAR_TITLE,
  showBackButton = false,
  navigation,
}: {
  title?: string,
  showBackButton: boolean,
  navigation: NavigationScreenProp<NavigationRoute, NavigationAction>,
}) => (
  <Header
    statusBarProps={{ barStyle: 'light-content' }}
    backgroundColor={Colors.NAVBAR_BACKGROUND}
    leftComponent={
      showBackButton ? (
        <Icon name="ios-arrow-back" size={30} color="white" onPress={() => navigation.goBack} />
      ) : null
    }
    centerComponent={{ text: title, style: { color: '#fff', fontSize: 15 } }}
  />
);

export default NavBar;

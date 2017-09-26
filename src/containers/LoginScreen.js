/* @flow */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import type {
  NavigationScreenProp,
  NavigationRoute,
  NavigationAction,
} from 'react-navigation/src/TypeDefinition';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';

import { actions } from '../redux/reducers/auth';
import { actions as uiActions } from '../redux/reducers/ui';
import * as Strings from '../constants/strings';
import * as Colors from '../constants/colors';
import NavBar from '../components/common/NavBar';

type Props = {
  navigation: NavigationScreenProp<NavigationRoute, NavigationAction>,
  updateUsername: (username: string) => {},
  updatePassword: (password: string) => {},
  login: () => {},
};

class LoginScreen extends React.PureComponent<void, Props, void> {
  static navigationOptions = {
    header: <NavBar />,
  };

  _onLoginButtonPress = () => {
    this.props.login();
  };

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <FormLabel>{Strings.USERNAME}</FormLabel>
          <FormInput onChangeText={this.props.updateUsername} />
          <FormLabel>{Strings.PASSWORD}</FormLabel>
          <FormInput onChangeText={this.props.updatePassword} secureTextEntry />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor={Colors.BUTTON_BACKGROUND}
            title={Strings.SIGN_IN}
            onPress={this._onLoginButtonPress}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
    paddingVertical: 20,
  },
});

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  updateUsername: uiActions.updateLoginScreenUsernameInput,
  updatePassword: uiActions.updateLoginScreenPasswordInput,
  login: actions.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

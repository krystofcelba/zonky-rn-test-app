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

import { updateUsername, updatePassword, login } from '../redux/actions/auth';
import * as Strings from '../constants/strings';

type Props = {
  navigation: NavigationScreenProp<NavigationRoute, NavigationAction>,
  updateUsername: (username: string) => {},
  updatePassword: (password: string) => {},
  login: () => {},
};

class LoginScreen extends React.PureComponent<void, Props, void> {
  static navigationOptions = {
    title: 'Login Screen',
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
          <FormInput onChangeText={this.props.updatePassword} />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
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
    flex: 1,
    paddingVertical: 20,
  },
});

const mapStateToProps = () => ({});
const mapDispatchToProps = { updateUsername, updatePassword, login };

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

/* @flow */
import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import type {
  NavigationScreenProp,
  NavigationRoute,
  NavigationAction,
} from 'react-navigation/src/TypeDefinition';
import { FormLabel, FormInput, Card, Button } from 'react-native-elements';

import { authenticate } from '../redux/actions/auth';
import * as Strings from '../constants/strings';

type Props = {
  navigation: NavigationScreenProp<NavigationRoute, NavigationAction>,
};

type State = {
  username: string,
  password: string,
};

class LoginScreen extends React.PureComponent<void, Props, State> {
  static navigationOptions = {
    title: 'Login Screen',
  };

  state = {
    username: '',
    password: '',
  };

  _onLoginButtonPress = () => {
    this.props.authenticate();
  };

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <FormLabel>{Strings.USERNAME}</FormLabel>
          <FormInput onChangeText={username => this.setState({ username })} />
          <FormLabel>{Strings.PASSWORD}</FormLabel>
          <FormInput onChangeText={password => this.setState({ password })} />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title={Strings.SIGN_IN}
            onPress={() => this.props.authenticate()}
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
const mapDispatchToProps = { authenticate };

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

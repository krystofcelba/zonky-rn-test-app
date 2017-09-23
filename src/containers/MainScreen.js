/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import { fetchNextLoansPage } from '../redux/actions/loans';

type Props = {
  fetchNextLoansPage: () => {},
};

class MainScreen extends React.PureComponent<void, Props, void> {
  static navigationOptions = {
    title: 'Main Screen',
  };

  componentDidMount() {
    this.props.fetchNextLoansPage();
  }

  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = () => ({});
const mapDispatchToProps = { fetchNextLoansPage };

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

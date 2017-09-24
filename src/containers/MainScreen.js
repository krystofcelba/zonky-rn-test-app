/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import type {
  NavigationScreenProp,
  NavigationRoute,
  NavigationAction,
} from 'react-navigation/src/TypeDefinition';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import _ from 'lodash';

import type { Loan } from '../redux/sagas/api';
import { fetchNextLoansPage } from '../redux/actions/loans';
import LoanCard from '../components/main-screen/LoanCard';
import NavBar from '../components/common/NavBar';

type Props = {
  navigation: NavigationScreenProp<NavigationRoute, NavigationAction>,
  loans: Loan[],
  loading: boolean,
  fetchNextLoansPage: () => {},
};

const LOAN_CARD_HEIGHT = 402.5;

class MainScreen extends React.PureComponent<void, Props, void> {
  static navigationOptions = {
    header: <NavBar />,
  };

  componentDidMount() {
    this.props.fetchNextLoansPage();
  }

  _onEndReached = () => {
    console.log('on end reached');
    this.props.fetchNextLoansPage();
  };

  _onLoanDetailPress = (loanId) => {
    console.log(`detail ${loanId}`);
    const { navigation } = this.props;
    navigation.navigate('LoanDetail', { loanId });
  };

  render() {
    const { loans, loading } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={loans}
          keyExtractor={item => item.id}
          getItemLayout={(data, index) => ({
            // TODO: Calculate dynamic card height based on lenght of loan story.
            length: LOAN_CARD_HEIGHT,
            offset: LOAN_CARD_HEIGHT * index,
            index,
          })}
          renderItem={({ item }) => (
            <LoanCard loan={item} onDetailButtonPress={this._onLoanDetailPress} />
          )}
          onEndReached={_.debounce(this._onEndReached, 1500)}
          ListFooterComponent={() =>
            (loading ? <ActivityIndicator size="large" animating /> : null)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
  },
});

const mapStateToProps = ({ loans: { loans, loading } }) => ({
  loans: Object.keys(loans).map(loanId => loans[loanId]),
  loading,
});
const mapDispatchToProps = { fetchNextLoansPage };

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import _ from 'lodash';

import type { Loan } from '../redux/sagas/api';
import { fetchNextLoansPage } from '../redux/actions/loans';
import LoanCard from '../components/main-screen/LoanCard';

type Props = {
  loans: Loan[],
  loading: boolean,
  fetchNextLoansPage: () => {},
};

const LOAN_CARD_HEIGHT = 402.5;

class MainScreen extends React.PureComponent<void, Props, void> {
  static navigationOptions = {
    title: 'ZONKY',
  };

  componentDidMount() {
    this.props.fetchNextLoansPage();
  }

  onEndReached = () => {
    console.log('on end reached');
    this.props.fetchNextLoansPage();
  };

  render() {
    const { loans, loading } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={loans}
          keyExtractor={item => item.id}
          getItemLayout={(data, index) => ({
            length: LOAN_CARD_HEIGHT,
            offset: LOAN_CARD_HEIGHT * index,
            index,
          })}
          renderItem={({ item }) => <LoanCard loan={item} />}
          onEndReached={_.debounce(this.onEndReached, 1500)}
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
  },
});

const mapStateToProps = ({ loans: { loans, loading } }) => ({
  loans: Object.keys(loans).map(loanId => loans[loanId]),
  loading,
});
const mapDispatchToProps = { fetchNextLoansPage };

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

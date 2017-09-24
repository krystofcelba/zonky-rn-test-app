/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList } from 'react-native';

import type { Loan } from '../redux/sagas/api';
import { fetchNextLoansPage } from '../redux/actions/loans';
import LoanCard from '../components/main-screen/LoanCard';

type Props = {
  loans: Loan[],
  loading: boolean,
  fetchNextLoansPage: () => {},
};

class MainScreen extends React.PureComponent<void, Props, void> {
  static navigationOptions = {
    title: 'ZONKY',
  };

  componentDidMount() {
    this.props.fetchNextLoansPage();
  }

  render() {
    const { loans } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={loans}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <LoanCard loan={item} />}
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

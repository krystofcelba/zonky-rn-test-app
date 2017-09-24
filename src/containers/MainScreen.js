/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

import type { Loan } from '../redux/sagas/api';

import { fullUriForPath } from '../redux/sagas/api';
import { fetchNextLoansPage } from '../redux/actions/loans';

type Props = {
  loans: Loan[],
  loading: boolean,
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
    const { loans } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={loans}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card image={{ uri: fullUriForPath(item.photos[0].url) }}>
              <Text style={{ marginBottom: 10 }}>{item.story}</Text>
              <Button
                icon={{ name: 'code' }}
                backgroundColor="#03A9F4"
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title="VIEW NOW"
              />
            </Card>
          )}
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

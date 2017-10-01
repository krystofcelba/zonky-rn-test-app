import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';

import type { Loan } from '../../redux/sagas/api';
import { fullUriForPath } from '../../redux/sagas/api';
import * as Colors from '../../constants/colors';

import LoanProgressView from '../common/LoanProgressView';

type Props = {
  loan: Loan,
  onDetailButtonPress: (loanId: string) => {},
};

class LoanCard extends React.PureComponent<void, Props, void> {
  _onDetailButtonPress = () => {
    const { loan, onDetailButtonPress } = this.props;
    onDetailButtonPress(loan.id);
  };

  render() {
    const { loan } = this.props;
    return (
      <TouchableOpacity onPress={this._onDetailButtonPress}>
        <Card image={{ uri: fullUriForPath(loan.photos[0].url) }}>
          <Text style={styles.title}>{loan.name.toUpperCase()}</Text>
          <Text style={styles.subtitle} numberOfLines={4}>
            {loan.story}
          </Text>
          <LoanProgressView loan={loan} style={styles.loanProgressView} />
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    height: 80,
    marginBottom: 10,
  },
  loanProgressView: {
    marginBottom: 0,
  },
  detailButton: {},
  infoContainer: { justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 },
});

export default LoanCard;

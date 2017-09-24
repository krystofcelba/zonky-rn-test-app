import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';

import type { Loan } from '../../redux/sagas/api';
import * as Strings from '../../constants/strings';
import * as Colors from '../../constants/colors';

import PropertyBox from '../common/PropertyBox';
import LoanProgressView from '../common/LoanProgressView';

import { percentage } from '../../lib/utils';

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
      <Card image={{ uri: loan.photoUri }}>
        <Text style={styles.title}>{loan.name.toUpperCase()}</Text>
        <Text style={styles.subtitle} numberOfLines={4}>
          {loan.story}
        </Text>
        <LoanProgressView loan={loan} style={styles.loanProgressView} />
        <Button
          backgroundColor={Colors.BUTTON_BACKGROUND}
          buttonStyle={styles.detailButton}
          title="DETAIL"
          onPress={this._onDetailButtonPress}
        />
      </Card>
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
    marginBottom: 10,
  },
  detailButton: {},
  infoContainer: { justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 },
});

export default LoanCard;

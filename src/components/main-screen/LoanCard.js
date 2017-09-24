import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';

import type { Loan } from '../../redux/sagas/api';
import * as Strings from '../../constants/strings';

import PropertyBox from '../common/PropertyBox';

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
        <Button
          backgroundColor="#e75637"
          buttonStyle={styles.detailButton}
          title="DETAIL"
          onPress={this._onDetailButtonPress}
        />
        <View style={styles.infoContainer}>
          <PropertyBox title={Strings.RATING} value={loan.rating} />
          <PropertyBox title={Strings.INTEREST_RATE} value={`${percentage(loan.interestRate)} %`} />
          <PropertyBox title={Strings.REPAYMENT_PERIOD} value={`${loan.termInMonths} měs`} />
        </View>
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
  detailButton: {},
  infoContainer: { justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 },
});

export default LoanCard;

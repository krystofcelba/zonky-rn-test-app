import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

import type { Loan } from '../../redux/sagas/api';
import { fullUriForPath } from '../../redux/sagas/api';
import * as Strings from '../../constants/strings';

import PropertyBox from './PropertyBox';

const percentage = interestRate => (interestRate * 100).toFixed(2);

type Props = {
  loan: Loan,
};

const LoanCard = ({ loan }: Props) => (
  <Card image={{ uri: fullUriForPath(loan.photos[0].url) }}>
    <Text style={styles.title}>{loan.name.toUpperCase()}</Text>
    <Text style={styles.subtitle} numberOfLines={3}>
      {loan.story}
    </Text>
    <Button backgroundColor="#03A9F4" buttonStyle={styles.detailButton} title="DETAIL" />
    <View style={styles.infoContainer}>
      <PropertyBox title={Strings.RATING} value={loan.rating} />
      <PropertyBox title={Strings.INTEREST_RATE} value={`${percentage(loan.interestRate)} %`} />
      <PropertyBox title={Strings.REPAYMENT_PERIOD} value={`${loan.termInMonths} měs`} />
    </View>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 10,
  },
  detailButton: {},
  infoContainer: { justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 },
});

export default LoanCard;

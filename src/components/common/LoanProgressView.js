/* @flow */
import React from 'react';
import { View, Text, StyleSheet, ProgressViewIOS } from 'react-native';

import type { Loan } from '../../redux/sagas/api';
import * as Strings from '../../constants/strings';
import * as Colors from '../../constants/colors';

type Props = {
  loan: Loan,
  style: number,
};

const LoanProgressView = ({ loan: { amount, remainingInvestment }, style }: Props) => {
  const investedAmount = amount - remainingInvestment;
  const investedPercent = investedAmount / amount;
  return (
    <View style={[style]}>
      <Text style={styles.progressTitle}>
        {Strings.loanProgressTitleFormatter(investedAmount, amount)}
      </Text>
      <ProgressViewIOS progressTintColor={Colors.PROGRESS_BAR_TINT} progress={investedPercent} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressTitle: {
    textAlign: 'center',
    color: Colors.LOAN_PROGRESS_TITLE,
  },
});

export default LoanProgressView;

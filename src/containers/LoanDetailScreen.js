/* @flow */
import React from 'react';
import { View, StyleSheet, ScrollView, Image, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatDistanceStrict } from 'date-fns';
import cs from 'date-fns/locale/cs';
import type {
  NavigationScreenProp,
  NavigationRoute,
  NavigationAction,
} from 'react-navigation/src/TypeDefinition';

import type { Loan } from '../redux/sagas/api';
import * as Strings from '../constants/strings';
import { percentage } from '../lib/utils';

import NavBar from '../components/common/NavBar';
import PropertyBox from '../components/common/PropertyBox';

const window = Dimensions.get('window');
const PARALLAX_IMAGE_HEIGHT = 200;

type Props = {
  navigation: NavigationScreenProp<NavigationRoute, NavigationAction>,
  loanId: string,
  loan: Loan,
};

class LoanDetailScreen extends React.PureComponent<void, Props, void> {
  static navigationOptions = {
    title: 'Loan',
    header: null,
  };
  render() {
    const { loan, navigation } = this.props;
    return (
      <View style={styles.container}>
        <ParallaxScrollView
          contentBackgroundColor="#e9e9ef"
          parallaxHeaderHeight={PARALLAX_IMAGE_HEIGHT}
          renderBackground={() => (
            <View style={{ backgroundColor: 'transparent' }}>
              <Image
                source={{
                  uri: loan.photoUri,
                  width: window.width,
                  height: PARALLAX_IMAGE_HEIGHT,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  width: window.width,
                  backgroundColor: 'rgba(0,0,0,.5)',
                  height: PARALLAX_IMAGE_HEIGHT,
                }}
              />
            </View>
          )}
          renderStickyHeader={() => <NavBar title="DETAIL" showBackButton={false} />}
          stickyHeaderHeight={64}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{loan.name.toUpperCase()}</Text>

            <Text style={styles.story}>{loan.story}</Text>
            <View style={[styles.infoContainer, { justifyContent: 'space-around' }]}>
              <PropertyBox
                title={Strings.INVESTORS_COUNT}
                value={loan.investmentsCount}
                color="white"
              />
              <PropertyBox
                title={Strings.REMAINING_TIME}
                value={formatDistanceStrict(new Date(), loan.deadline, { locale: cs })}
                color="white"
              />
            </View>
            <View style={styles.infoContainer}>
              <PropertyBox title={Strings.RATING} value={loan.rating} color="white" />
              <PropertyBox
                title={Strings.INTEREST_RATE}
                value={`${percentage(loan.interestRate)} %`}
                color="white"
              />
              <PropertyBox
                title={Strings.REPAYMENT_PERIOD}
                value={`${loan.termInMonths} měs`}
                color="white"
              />
            </View>
          </View>
        </ParallaxScrollView>
        <Icon
          name="ios-arrow-back"
          size={30}
          color="white"
          style={styles.backButtonIcon}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: { flex: 1, height: 64 },
  backButtonIcon: { position: 'absolute', top: 30, left: 15 },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    height: 500,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  story: {
    fontSize: 14,
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: '#5dbd62',
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
  },
});

const mapStateToProps = ({ loans: { loans } }, { loanId }) => {
  console.log(loanId);
  return { loan: loans[loanId] };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoanDetailScreen);

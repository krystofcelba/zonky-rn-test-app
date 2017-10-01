/* @flow */
import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
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
import { fullUriForPath } from '../redux/sagas/api';
import { percentage } from '../lib/utils';

import NavBar from '../components/common/NavBar';
import PropertyBox from '../components/common/PropertyBox';
import LoanProgressView from '../components/common/LoanProgressView';

import * as Strings from '../constants/strings';
import * as Colors from '../constants/colors';

const window = Dimensions.get('window');
const PARALLAX_IMAGE_HEIGHT = 200;

type Props = {
  navigation: NavigationScreenProp<NavigationRoute, NavigationAction>,
  loanId: string,
  loan: Loan,
};

class LoanDetailScreen extends React.PureComponent<void, Props, void> {
  static navigationOptions = {
    header: null,
  };
  render() {
    const { loan, navigation } = this.props;
    return (
      <View style={styles.container}>
        <ParallaxScrollView
          contentBackgroundColor={Colors.SCREENS_BACKGROUND}
          parallaxHeaderHeight={PARALLAX_IMAGE_HEIGHT}
          renderBackground={() => (
            <View style={{ backgroundColor: 'transparent' }}>
              <Image
                source={{
                  uri: fullUriForPath(loan.photos[0].url),
                  width: window.width,
                  height: PARALLAX_IMAGE_HEIGHT,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  width: window.width,
                  backgroundColor: Colors.PARALLAX_IMAGE_OVERLAY,
                  height: PARALLAX_IMAGE_HEIGHT,
                }}
              />
            </View>
          )}
          renderStickyHeader={() => <NavBar />}
          stickyHeaderHeight={64}
        >
          <View style={styles.contentContainer}>
            <LoanProgressView loan={loan} style={styles.progressContainer} />
            <View
              style={[styles.infoContainer, { justifyContent: 'space-around', marginBottom: 1 }]}
            >
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
            <Text style={styles.title}>{loan.name.toUpperCase()}</Text>
            <Text style={styles.story}>{loan.story}</Text>
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
  progressContainer: {
    marginBottom: 5,
  },
  infoContainer: {
    backgroundColor: Colors.INFO_CONTAINER_BACKGROUND,
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const mapStateToProps = ({ loans: { loans } }, { loanId }) => {
  console.log(loanId);
  return { loan: loans[loanId] };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoanDetailScreen);

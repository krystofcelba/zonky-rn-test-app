import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';

import { actions } from '../redux/reducers/ui';

type Props = {
  children: {},
  errorAlertVisible: boolean,
  errorAlertMessage: '',
  hideErrorAlert: () => {},
};

class WithDropdownAlert extends React.PureComponent<void, Props, void> {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errorAlertVisible !== this.props.errorAlertVisible) {
      if (nextProps.errorAlertVisible) {
        this._dropdown.alertWithType('error', 'Error', nextProps.errorAlertMessage);
      } else {
        this._dropdown.dismiss();
      }
    }
  }
  _dropdown = null;

  _onErrorAlertClose = () => {
    this.props.hideErrorAlert();
  };

  render() {
    const { children } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {children}
        <DropdownAlert
          ref={ref => (this._dropdown = ref)}
          closeInterval={0}
          onClose={this._onErrorAlertClose}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ ui: { global: { errorAlertVisible, errorAlertMessage } } }) => ({
  errorAlertVisible,
  errorAlertMessage,
});

const mapActionsToProps = { hideErrorAlert: actions.hideErrorAlert };

export default connect(mapStateToProps, mapActionsToProps)(WithDropdownAlert);

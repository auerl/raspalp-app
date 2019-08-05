import React, { Component } from 'react';

import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { qrcodeStyle } from './style'
import { connect } from 'react-redux';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Card, CardSection, Input, Spinner } from '../common';

import { Actions, ActionConst } from 'react-native-router-flux';

import { addDeviceToUser, registerDeviceAccount } from '../../actions/QRCodeActions';

import {
  DEVICE_NAME,
  DEVICE_PASSWORD,
  DEVICE_SERIAL_NUMBER,
  H_DEVICE_NAME,
  H_DEVICE_PASSWORD,
  H_DEVICE_SERIAL_NUMBER,
  ALERT_TITLE,
  OK,
} from '../../config/strings';


class QRCode extends Component {
  state = {
    hasCameraPermission: null,
    deviceName: '',
    deviceRegistered: false,
    deviceSerialNumber: '',
    devicePassword: '',
    deviceToken: '',
    scanned: false,
    needToRegister: false,
    message: ''
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  onPressOK = () => {
    console.log('onPressOK pressed');
  }

  onRegisterButtonPress = () => {
    const { deviceName, deviceSerialNumber, devicePassword } = this.state;
    if (deviceName.length && deviceSerialNumber.length && devicePassword.length) {
      this.props.registerDeviceAccount(deviceName, deviceSerialNumber, devicePassword);
      this.props.addDeviceToUser(this.props.userToken, deviceSerialNumber);
      Alert.alert(
        "Info", "Gerät erfolgreich hinzugefügt!",
        [{ text: OK, onPress: () => Actions.dashboard({ type: ActionConst.RESET }), style: 'cancel' }],
        { cancelable: false },
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.deviceSerialNumber){
      this.props.addDeviceToUser(this.props.userToken, this.props.deviceSerialNumber)
    } else if (nextProps.error && nextProps.error == 'deviceNotFound') {
      this.setState({ needToRegister: true })
      Alert.alert(
        "Info", "Neues Gerät, bitte registrieren!",
        [{ text: OK, onPress: () => this.onPressOK(), style: 'cancel' }],
        { cancelable: false },
      );
    } else if (nextProps.registered && this.props.deviceSerialNumber) {
      this.props.addDeviceToUser(this.props.userToken, this.props.deviceSerialNumber)
    } else if (nextProps.error && nextProps.error == 'deviceAlreadyAdded') {
      Alert.alert(
        "Info", "Gerät bereits hinzugefügt!",
        [{ text: OK, onPress: () => Actions.dashboard({ type: ActionConst.RESET }), style: 'cancel' }],
        { cancelable: false },
      );
    } else if (nextProps.error && nextProps.error == 'registrationFailed') {
      Alert.alert(
        "Fehler", "Registrierung fehlgeschlagen!",
        [{ text: OK, onPress: () => this.onPressOK(), style: 'cancel' }],
        { cancelable: false },
      );
    }
  }

  render() {
    const { hasCameraPermission, scanned, needToRegister } = this.state;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        {!scanned && (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        )}
        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false, needToRegister: false })} />
        )}
        {needToRegister && (
          <View style={qrcodeStyle.containerStyle}>
            <Card>
              <CardSection>
                <Input
                  label={DEVICE_NAME}
                  placeholder={H_DEVICE_NAME}
                  value={this.state.deviceName}
                  onChangeText={text => this.setState({ deviceName: text })}
                />
              </CardSection>
              <CardSection>
                <Input
                  label={DEVICE_SERIAL_NUMBER}
                  placeholder={H_DEVICE_SERIAL_NUMBER}
                  value={this.state.deviceSerialNumber}
                  onChangeText={text => this.setState({ deviceName: text })}
                />
              </CardSection>
              <CardSection>
                <Input
                  secureTextEntry
                  label={DEVICE_PASSWORD}
                  placeholder={H_DEVICE_PASSWORD}
                  value={this.state.devicePassword}
                  onChangeText={text => this.setState({ devicePassword: text })}
                />
              </CardSection>
            </Card>
            <Text style={qrcodeStyle.errorTextStyle}>
              {this.props.message}
            </Text>
            <View style={{width: "60%", alignSelf: "center"}}>
              <Button
                title="Registrieren"
                style={qrcodeStyle.buttonStyle}
                onPress={this.onRegisterButtonPress}>
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    this.setState({ deviceSerialNumber: data});
    this.props.addDeviceToUser(this.props.userToken, data)
  };
}

const mapStateToProps = state => ({
  deviceRegistered: state.qrcode.deviceRegistered,
  deviceName: state.qrcode.deviceName,
  deviceToken: state.qrcode.deviceToken,
  devicePassword: state.qrcode.devicePassword,
  deviceSerialNumber: state.qrcode.deviceSerialNumber,
  userToken: state.login.userToken,
  loading: state.qrcode.loading,
  message: state.qrcode.message,
  error: state.qrcode.error,
  scanned: false,
  message: ''
});


export default connect(mapStateToProps, { addDeviceToUser, registerDeviceAccount })(QRCode);

/**
 * Login Register compnent
 */
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from '../common';
import { loginStyle } from './style'

import { Text, Button } from 'react-native-elements';

import logo from "../../../assets/logo.png";

class SignInSignUp extends Component {
  constructor(props) {
    super(props);
  }

  onLoginPress = () => {
    Actions.login();
  }
  onRegisterPress = () => {
    Actions.register();
  }

  render() {
    return (

      <View style={loginStyle.containerStyle}>

        <Text h3 align='center' style={loginStyle.textStyle}>raspalp-app v. 0.1</Text>
        <Image source={logo} style={loginStyle.logoStyle} />
        <View style={{flexDirection: 'row'}}>
            <View style={{flex:1 , marginRight:10}} >
              <Button title="Login" onPress={this.onLoginPress}></Button>
            </View>
            <View style={{flex:1}} >
              <Button title="Registrieren" onPress={this.onRegisterPress}></Button>
            </View>
        </View>
      </View>
    );
  }
}


export default SignInSignUp;

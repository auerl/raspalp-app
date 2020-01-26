/**
 * Login Register compnent
 */
import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from '../common';
import { loginStyle } from './style'

import { Text, Button } from 'react-native-elements';

import logo from "../../../assets/logo.png";
import background from "../../../assets/tomato.png";

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

      <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
        <View style={loginStyle.containerStyle}>
          <Text align='center' style={loginStyle.textStyle}>0.1.2rc1</Text>
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
      </ImageBackground>

    );
  }
}


export default SignInSignUp;

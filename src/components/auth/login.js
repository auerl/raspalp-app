/**
 * Login component
 */
import React, { Component } from 'react';
import { View, Text, Alert, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { loginToUserAccount } from '../../actions/LoginActions';
import { Card, CardSection, Input, Spinner } from '../common';
import { Button } from 'react-native-elements';

import { loginStyle } from './style'
import { signinStrings, alertTitles } from '../../config/strings';
import { userErrors } from '../../config/errors';

import background from "../../../assets/tomato.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillReceiveProps(nextProps) {
    console.log("component update");
    if(nextProps.authorized){
      Actions.dashboard({ type: ActionConst.RESET });
    } else if (nextProps.error) {
      Alert.alert(
        alertTitles.error,
        userErrors.userNotFoundError,
        [{ text: alertTitles.ok, onPress: () => this.onPressOK(), style: 'cancel' }],
        { cancelable: false },
      );
    }
  }

  onButtonPress = () => {
    const { email, password } = this.state;
    if (email.length && password.length) {
      const resp = this.props.loginToUserAccount(email, password);
    }
    // Hack to avoid having to type in passoword and username
    const resp = this.props.loginToUserAccount('familie@auer.de','test1234');
  }

  onPressOK = () => {
    console.log('onPressOK pressed');
  }

  renderButton = () => {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress}>Login</Button>
    );
  }

  render() {
    return (
      <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
        <View style={loginStyle.containerStyle}>
          <Card>
            <CardSection>
              <Input
                label={signinStrings.emailTitle}
                placeholder={signinStrings.emailPlace}
                value={this.state.email}
                onChangeText={text => this.setState({email: text})}
              />
            </CardSection>
            <CardSection>
              <Input
                secureTextEntry
                label={signinStrings.passwordTitle}
                placeholder={signinStrings.passwordPlace}
                value={this.state.password}
                onChangeText={text => this.setState({password: text})}
              />
            </CardSection>
          </Card>
          <Text style={loginStyle.errorTextStyle}>
            {this.props.message}
          </Text>
          <View style={{width: "60%", alignSelf: "center"}}>
            <Button
              title={signinStrings.loginButton}
              style={loginStyle.buttonStyle}
              onPress={this.onButtonPress}>
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.login.loading,
  error: state.login.err,
  userToken: state.login.userToken,
  authorized: state.login.authorized,
  message: state.login.message,
});

export default connect(mapStateToProps, { loginToUserAccount })(Login);

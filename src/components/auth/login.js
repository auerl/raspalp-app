/**
 * People compnent to login with name and birth year
 */
import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { loginToUserAccount } from '../../actions/LoginActions';
import { Card, CardSection, Input, Spinner } from '../common';
import { Button } from 'react-native-elements';
import { loginStyle } from './style'
import {
  USERNAME,
  EMAIL,
  PASSWORD,
  H_USERNAME,
  H_PASSWORD,
  H_EMAIL,
  USER_NOT_FOUND_ERROR,
  ALERT_TITLE,
  ERROR_TITLE,
  OK,
} from '../../config/strings';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
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
        ERROR_TITLE, USER_NOT_FOUND_ERROR,
        [{ text: OK, onPress: () => this.onPressOK(), style: 'cancel' }],
        { cancelable: false },
      );
    }
  }

  onButtonPress = () => {
    const { email, password } = this.state;
    if (email.length && password.length) {
      const resp = this.props.loginToUserAccount(email, password);
    }
    //const resp = this.props.loginToUserAccount('ludwig.auer@gmail.com','test1234');
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
      <View style={loginStyle.containerStyle}>
        <Card>
          <CardSection>
            <Input
              label={EMAIL}
              placeholder={H_EMAIL}
              value={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              label={PASSWORD}
              placeholder={H_PASSWORD}
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
          </CardSection>
        </Card>
        <Text style={loginStyle.errorTextStyle}>
          {this.props.message}
        </Text>
        <View style={{width: "60%", alignSelf: "center"}}>
        <Button
          title="Login"
          style={loginStyle.buttonStyle}
          onPress={this.onButtonPress}>
        </Button>
        </View>
      </View>
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

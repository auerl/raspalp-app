/**
 * People compnent to login with name and birth year
 */
import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { loginToUserAccount } from '../../actions/LoginActions';
import { registerUserAccount } from '../../actions/RegisterActions';
import { Card, CardSection, Input, Spinner } from '../common';
import { Button } from 'react-native-elements';
import { loginStyle } from './style'
import {
  EMAIL,
  USERNAME,
  PASSWORD,
  H_USERNAME,
  H_PASSWORD,
  H_EMAIL,
  ALERT_TITLE,
  OK,
} from '../../config/strings';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: '',
      username: '',
      authorized: false,
      registered: false,
      email: '',
      password: '',
      message: ''
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentWillMount');
  }

  onButtonPress = () => {
    const { username, email, password } = this.state;
    if (username.length && email.length && password.length) {
      const resp = this.props.registerUserAccount(username, email, password);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.registered && nextProps.email && nextProps.password){
      const resp = this.props.loginToUserAccount(nextProps.email, nextProps.password);
    } else if (nextProps.authorized) {
      Actions.dashboard({ type: ActionConst.RESET });
    }
  }

  render() {
    return (
      <View style={loginStyle.containerStyle}>
        <Card>
          <CardSection>
            <Input
              label={USERNAME}
              placeholder={H_USERNAME}
              value={this.state.username}
              onChangeText={text => this.setState({ username: text })}
            />
          </CardSection>
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
           title="Registrieren"
           style={loginStyle.buttonStyle}
           onPress={this.onButtonPress}>
         </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authorized: state.login.authorized,
  loading: state.register.loading,
  userToken: state.register.userToken,
  registered: state.register.registered,
  email: state.register.email,
  password: state.register.password,
  message: state.register.message,
});


export default connect(mapStateToProps, { registerUserAccount, loginToUserAccount })(Register);

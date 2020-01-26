import { Auth } from './types';

import {
  UserEndpoints,
  RequestMethods,
  HttpStatus
} from '../network/ApiConst';

import { ApiCall } from '../network/ApiUtils';

export const registerUserAccount = (username, email, password) => (dispatch) => {
  dispatch({ type: Auth.signup.loading });
  const payload = {username: username, email: email, password: password};
  const request = ApiCall(
    UserEndpoints.signup, RequestMethods.post, payload, {},
    response => onRegisterSuccess(dispatch, response, payload),
    error => onRegisterNetworkError(dispatch, error)
  );
}

const onRegisterSuccess = (dispatch, response, payload) => {
  if (response && response.meta.code === HttpStatus.ok ) {
    dispatch({
      type: Auth.signup.success,
      payload: payload
    });
    console.log('Sucessfully registered account: ', response);
  } else if (response.meta && response.meta.code === HttpStatus.userAlreadyExists ){
    dispatch({ type: Auth.signup.fail });
    console.log('Registration failed - user already exists: ', response);
  } else {
    dispatch({ type: Auth.signup.fail });
    console.log('Registration failed: ', response);
  }
}

const onRegisterNetworkError = (dispatch, error) => {
  dispatch({ type: Auth.signup.fail });
  console.log('Login failed: ', error);
}

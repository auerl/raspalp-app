import {
  SIGNUP_SUCCESS,
  SIGNUP_LOADING,
  SIGNUP_FAIL
} from './types';

import { USER_SIGNUP_ENDPOINT } from '../network/ApiConst';
import { ApiPostJSON } from '../network/ApiUtils';

export const registerUserAccount = (username, email, password) => (dispatch) => {
  dispatch({ type: SIGNUP_LOADING });
  const payload = {username: username, email: email, password: password};
  const request = ApiPostJSON(
    USER_SIGNUP_ENDPOINT,
    payload,
    response => onRegisterSuccess(dispatch, response, payload),
    error => onRegisterNetworkError(dispatch, error)
  );
}

const onRegisterSuccess = (dispatch, response, payload) => {
  if (response && response.meta.code === 200 ) {
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: payload
    });
    console.log('Sucessfully registered account: ', response);
  } else if (response.meta && response.meta.code === 25 ){
    dispatch({ type: SIGNUP_FAIL });
    console.log('Registration failed - user already exists: ', response);
  } else {
    dispatch({ type: SIGNUP_FAIL });
    console.log('Registration failed: ', response);
  }
}

const onRegisterNetworkError = (dispatch, error) => {
  dispatch({ type: SIGNUP_FAIL });
  console.log('Login failed: ', error);
}

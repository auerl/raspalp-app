import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_LOADING,
} from './types';

import { USER_LOGIN_ENDPOINT  } from '../network/ApiConst';
import { ApiPostJSON } from '../network/ApiUtils';

export const loginToUserAccount = (email, password) => (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  const payload = {email: email, password: password};
  const request = ApiPostJSON(
    USER_LOGIN_ENDPOINT,
    payload,
    response => onLoginSuccess(dispatch, response),
    error => onLoginNetworkError(dispatch, error)
  );
}

const onLoginSuccess = (dispatch, response) => {
  if (response && response.data && response.meta.code === 200 ) {
    dispatch({
      type: AUTH_SUCCESS,
      payload: response.data || []
    });
    console.log('Sucessfully logged in: ', response);
  } else if (response.meta && response.meta.code === 21 ){
    dispatch({ type: AUTH_FAIL });
    console.log('Login failed - user doesnt exist: ', response);
  } else if (response.meta && response.meta.code === 22 ){
    dispatch({ type: AUTH_FAIL });
    console.log('Login failed - wrong password: ', response);
  } else {
    dispatch({ type: AUTH_FAIL });
    console.log('Login failed: ', response);
  }
}

const onLoginNetworkError = (dispatch, error) => {
  dispatch({ type: AUTH_FAIL });
  console.log('Login failed: ', error);
}

import {
  UserEndpoints,
  RequestMethods,
  HttpStatus
} from '../network/ApiConst';
import { Auth } from './types';
import { ApiCall } from '../network/ApiUtils';

export const loginToUserAccount = (email, password) => (dispatch) => {
  dispatch({ type: Auth.login.loading });
  const payload = {email: email, password: password};
  const data = ApiCall(
    UserEndpoints.login, RequestMethods.post, payload, {},
    response => onLoginSuccess(dispatch, response),
    error => onLoginNetworkError(dispatch, error)
  );
}

const onLoginSuccess = (dispatch, response) => {
  if (response && response.data && response.meta.code === HttpStatus.ok ) {
    dispatch({
      type: Auth.login.success,
      payload: response.data || []
    });
    console.log('Sucessfully logged in: ', response);
  } else if (response.meta && response.meta.code === HttpStatus.userNotFound ){
    dispatch({ type: Auth.login.fail });
    console.log('Login failed - user doesnt exist: ', response);
  } else if (response.meta && response.meta.code === HttpStatus.wrongPassword ){
    dispatch({ type: Auth.login.fail });
    console.log('Login failed - wrong password: ', response);
  } else {
    dispatch({ type: Auth.login.fail });
    console.log('Login failed: ', response);
  }
}

const onLoginNetworkError = (dispatch, error) => {
  dispatch({ type: Auth.login.fail });
  console.log('Login failed: ', error);
}

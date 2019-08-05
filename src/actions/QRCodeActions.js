import {
  DEVICE_ADD_FAIL,
  DEVICE_ADD_FAIL_ALREADY_ADDED,
  DEVICE_ADD_FAIL_NOT_FOUND,
  DEVICE_ADD_SUCCESS,
  DEVICE_ADD_LOADING,
  DEVICE_REGISTER_FAIL,
  DEVICE_REGISTER_SUCCESS,
  DEVICE_REGISTER_LOADING,
} from './types';

import { DEVICE_ADD_ENDPOINT, DEVICE_REGISTER_ENDPOINT  } from '../network/ApiConst';
import { ApiPostJSON, ApiCall } from '../network/ApiUtils';

export const addDeviceToUser = (token, serial_number) => (dispatch) => {
  dispatch({ type: DEVICE_ADD_LOADING });
  const devices = ApiCall(DEVICE_ADD_ENDPOINT, 'POST', {'serial_number': serial_number}, {'Authorization': token},
    response => onDeviceAddSuccess(dispatch, response),
    error => onDeviceAddNetworkError(dispatch, error)
  );
}

export const registerDeviceAccount = (name, serial_number, password) => (dispatch) => {
  dispatch({ type: DEVICE_REGISTER_LOADING });
  const payload = {name: name, serial_number: serial_number, password: password};
  const request = ApiPostJSON(
    DEVICE_REGISTER_ENDPOINT,
    payload,
    response => onDeviceRegisterSuccess(dispatch, response, payload),
    error => onDeviceRegisterNetworkError(dispatch, error)
  );
}


const onDeviceAddSuccess = (dispatch, response) => {
  if (response && response.meta.code === 200 ) {
    dispatch({ type: DEVICE_ADD_SUCCESS });
    console.log('Sucessfully added device: ', response);
  } else if (response.meta && response.meta.code === 24 ){
    // even though the request failed, we proceed as if it was sucessful
    // as the device is already registered
    dispatch({ type: DEVICE_ADD_FAIL_ALREADY_ADDED });
    console.log('Device already registered: ', response);
  } else if (response.meta && response.meta.code === 23 ){
    dispatch({ type: DEVICE_ADD_FAIL_NOT_FOUND });
    console.log('Adding device failed - device does not exist: ', response);
  } else {
    dispatch({ type: DEVICE_ADD_FAIL });
    console.log('Registration failed: ', response);
  }
}

const onDeviceAddNetworkError = (dispatch, error) => {
  dispatch({ type: DEVICE_ADD_FAIL });
  console.log('Login failed: ', error);
}


const onDeviceRegisterSuccess = (dispatch, response) => {
  if (response && response.meta.code === 200 ) {
    dispatch({
      type: DEVICE_REGISTER_SUCCESS,
      payload: response.data || []
    });
    console.log('Sucessfully logged in: ', response);
  } else if (response.meta && response.meta.code === 23 ){
    dispatch({ type: DEVICE_REGISTER_FAIL });
    console.log('Device registration failed - device does not exist: ', response);
  } else if (response.meta && response.meta.code === 22 ){
    dispatch({ type: DEVICE_REGISTER_FAIL });
    console.log('Device registration failed - wrong password: ', response);
  } else {
    dispatch({ type: DEVICE_REGISTER_FAIL });
    console.log('Device registration failed: ', response);
  }
}

const onDeviceRegisterNetworkError = (dispatch, error) => {
  dispatch({ type: DEVICE_REGISTER_FAIL });
  console.log('Device registration failed: ', error);
}

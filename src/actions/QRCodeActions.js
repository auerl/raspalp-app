import {
  DeviceEndpoints,
  HttpStatus,
  RequestMethods,
  BoxEndpoints
} from '../network/ApiConst';
import {
  ApiPostJSON,
  ApiCall
} from '../network/ApiUtils';
import { Device } from './types';

export const addDeviceToUser = (token, serial_number) => (dispatch) => {
  dispatch({ type: Device.add.loading });
  const devices = ApiCall(
    DeviceEndpoints.addDevice,
    RequestMethods.post,
    {'serial_number': serial_number},
    {'Authorization': token},
    response => onDeviceAddSuccess(dispatch, response),
    error => onDeviceAddNetworkError(dispatch, error)
  );
}

export const registerDeviceAccount = (name, serial_number, password) => (dispatch) => {
  dispatch({ type: Device.register.loading });
  const payload = {name: name, serial_number: serial_number, password: password};
  const request = ApiCall(
    DeviceEndpoints.registerDevice, RequestMethods.post, payload,{},
    response => onDeviceRegisterSuccess(dispatch, response, payload),
    error => onDeviceRegisterNetworkError(dispatch, error)
  );
}

export const loginAsDevice = (serial_number, password) => (dispatch) => {
  console.log(serial_number, password);
  dispatch({ type: Device.login.loading });
  const payload = {serial_number: serial_number, password: password};
  const request = ApiCall(
    DeviceEndpoints.login, RequestMethods.post, payload, {},
    response => onDeviceLoginSuccess(dispatch, response, payload),
    error => onDeviceLoginNetworkError(dispatch, error)
  );
}

export const setupDeviceWifi = (ssid, password) => (dispatch) => {
  dispatch({ type: Device.setup.loading });
  const payload = {ssid: ssid, password: password};
  const request = ApiCall(
    BoxEndpoints.updateWifi, RequestMethods.post, payload, {},
    response => onDeviceUpdateWifiSuccess(dispatch, response, payload),
    error => onDeviceUpdateWifiNetworkError(dispatch, error)
  );
}

export const setupDeviceToken = (token) => (dispatch) => {
  dispatch({ type: Device.setup.loading });
  console.log(token)
  const payload = {token: token};
  const request = ApiCall(
    BoxEndpoints.updateToken, RequestMethods.post, payload, {},
    response => onDeviceUpdateTokenSuccess(dispatch, response, payload),
    error => onDeviceUpdateTokenNetworkError(dispatch, error)
  );
}


const onDeviceAddSuccess = (dispatch, response) => {
  if (response && response.meta.code === HttpStatus.ok ) {
    dispatch({ type: Device.add.success });
    console.log('Sucessfully added device: ', response);
  } else if (response.meta && response.meta.code === HttpStatus.deviceAlreadyAdded ){
    dispatch({ type: Device.add.failExists });
    console.log('Device already registered: ', response);
  } else if (response.meta && response.meta.code === HttpStatus.deviceNotFound ){
    dispatch({ type: Device.add.failNotFound });
    console.log('Adding device failed - device does not exist: ', response);
  } else {
    dispatch({ type: Device.add.fail });
    console.log('Registration failed: ', response);
  }
}

const onDeviceAddNetworkError = (dispatch, error) => {
  dispatch({ type: Device.add.fail });
  console.log('Login failed: ', error);
}

const onDeviceRegisterSuccess = (dispatch, response) => {
  if (response && response.meta.code === HttpStatus.ok ) {
    dispatch({
      type: Device.register.success,
      payload: response.data || []
    });
    console.log('Sucessfully registered: ', response);
  } else if (response.meta && response.meta.code === HttpStatus.deviceNotFound ){
    dispatch({ type: Device.register.fail });
    console.log('Device registration failed - device does not exist: ', response);
  } else if (response.meta && response.meta.code === HttpStatus.wrongPassword ){
    dispatch({ type: Device.register.fail });
    console.log('Device registration failed - wrong password: ', response);
  } else {
    dispatch({ type: Device.register.fail });
    console.log('Device registration failed: ', response);
  }
}

const onDeviceRegisterNetworkError = (dispatch, error) => {
  dispatch({ type: Device.register.fail });
  console.log('Device registration failed: ', error);
}

const onDeviceLoginSuccess = (dispatch, response) => {
  if (response && response.meta.code === HttpStatus.ok ) {
    dispatch({
      type: Device.login.success,
      payload: response.data || []
    });
    console.log('Sucessfully logged in: ', response);
  } else {
    dispatch({ type: Device.login.fail });
    console.log('Device login failed: ', response);
  }
}

const onDeviceLoginNetworkError = (dispatch, error) => {
  dispatch({ type: Device.login.fail });
  console.log('Device login failed: ', error);
}

const onDeviceUpdateWifiSuccess = (dispatch, response) => {
  if (response && response.meta.code === HttpStatus.ok ) {
    dispatch({
      type: Device.setup.success,
      payload: response.data || []
    });
    console.log('Sucessfully logged in: ', response);
  } else {
    dispatch({ type: Device.setup.fail });
    console.log('Device wifi update failed: ', response);
  }
}

const onDeviceUpdateWifiNetworkError = (dispatch, error) => {
  dispatch({ type: Device.setup.fail });
  console.log('Device wifi update failed: ', error);
}

const onDeviceUpdateTokenSuccess = (dispatch, response) => {
  if (response && response.meta.code === HttpStatus.ok ) {
    dispatch({
      type: Device.setup.success,
      payload: response.data || []
    });
  } else {
    dispatch({ type: Device.setup.fail });
    console.log('Device token update failed: ', response);
  }
}

const onDeviceUpdateTokenNetworkError = (dispatch, error) => {
  dispatch({ type: Device.setup.fail });
  console.log('Device token update failed: ', error);
}

import {
  DEVICES_SUCCESS,
  DEVICES_FAIL,
  DEVICES
  } from './types';

import { USER_LIST_DEVICES_ENDPOINT } from '../network/ApiConst';
import { ApiCall } from '../network/ApiUtils';

export const getUserDevices = (token) => (dispatch) => {
  dispatch({ type: DEVICES });
  const devices = ApiCall(
    USER_LIST_DEVICES_ENDPOINT,
    'GET',
    {},
    {'Authorization': token},
    response => onGetDevicesSuccess(dispatch, response),
    error => onGetDevicesError(dispatch, error)
  );
};

const onGetDevicesSuccess = (dispatch, response) => {
  if (response && response.meta.code === 200 ) {
    dispatch({
      type: DEVICES_SUCCESS,
      payload: response.data || []
    });
  }
}

const onGetDevicesError = (dispatch, error) => {
  dispatch({ type: DEVICES_FAIL });
  console.log('onError: ', error);
}

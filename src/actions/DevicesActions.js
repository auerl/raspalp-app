import {
  UserEndpoints,
  RequestMethods,
  HttpStatus
} from '../network/ApiConst';
import { Device } from './types';
import { ApiCall } from '../network/ApiUtils';

export const getUserDevices = (token) => (dispatch) => {
  dispatch({ type: Device.list.default });
  const devices = ApiCall(
    UserEndpoints.listDevices, RequestMethods.get, {}, {'Authorization': token},
    response => onGetDevicesSuccess(dispatch, response),
    error => onGetDevicesError(dispatch, error)
  );
};

const onGetDevicesSuccess = (dispatch, response) => {
  if (response && response.meta.code == HttpStatus.ok ) {
    dispatch({
      type: Device.list.success,
      payload: response.data || []
    });
  }
}

const onGetDevicesError = (dispatch, error) => {
  dispatch({ type: Device.list.fail });
  console.log('onError: ', error);
}

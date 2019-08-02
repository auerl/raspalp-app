import {
  DEVICE_DATA,
  DEVICE_DATA_SUCCESS,
  DEVICE_DATA_FAIL
} from './types';
import { USER_BASE_DATA_ENDPOINT } from '../network/ApiConst';
import { ApiCall } from '../network/ApiUtils';

export const deviceDataAction = (device_id, token, type, from_utc, to_utc) => (dispatch) => {
  dispatch({ type: DEVICE_DATA });
  var url = USER_BASE_DATA_ENDPOINT;
  var url = url + device_id+'/'+type+'?from_utc='+from_utc.toString()+'&to_utc='+to_utc.toString();
  const devices = ApiCall(url, 'GET', {}, {'Authorization': token},
    response => onDataSuccess(dispatch, response),
    error => onDataError(dispatch, error)
  );
};

const onDataSuccess = (dispatch, response) => {
  if (response && response.meta.code === 200 ) {
    dispatch({
      type: DEVICE_DATA_SUCCESS,
      payload: response.data || {}
    });
  }
}
const onDataError = (dispatch, error) => {
  dispatch({ type: DEVICE_DATA_FAIL });
  console.log('onError: ', error);
}

import {
  DEVICE_DATA,
  DEVICE_DATA_SUCCESS,
  DEVICE_DATA_FAIL
} from './types';
import { USER_BASE_DATA_ENDPOINT } from '../network/ApiConst';
import { ApiCall } from '../network/ApiUtils';

export const deviceDataAction = (device_id, token, sensor_type) => (dispatch) => {
  const to_utc = Math.round(+new Date()/1000); // end now
  const from_utc = to_utc - 200.; // start 10 minutes ago
  //dispatch({ type: DEVICE_DATA});
  var url = USER_BASE_DATA_ENDPOINT;
  var url = url + device_id + '/' + sensor_type + '?from_utc=' + from_utc.toString() + '&to_utc=' + to_utc.toString();
  console.log(url);
  const data = ApiCall(
    url, 'GET', {}, {'Authorization': token},
    response => onDataSuccess(dispatch, response, sensor_type),
    error => onDataError(dispatch, error)
  );
};

const onDataSuccess = (dispatch, response, sensor_type) => {
  if (response && response.meta.code === 200 ) {
    dispatch({
      type: sensor_type,
      payload: response.data
    });
  }
}
const onDataError = (dispatch, error) => {
  dispatch({ type: DEVICE_DATA_FAIL });
  console.log('onError: ', error);
}

import {
  DeviceEndpoints,
  UserEndpoints,
  HttpStatus,
  RequestMethods
} from '../network/ApiConst';
import { Device } from './types';
import { ApiCall } from '../network/ApiUtils';

export const deviceDataAction = (device_id, token, sensor_type) => (dispatch) => {
  const to_utc = Math.round(+new Date()/1000); // end now
  const from_utc = to_utc - 200.; // start 10 minutes ago
  var url = UserEndpoints.getData;
  var url = url + device_id + '/' + sensor_type + '?from_utc=' + from_utc.toString() + '&to_utc=' + to_utc.toString();
  console.log(url);
  const data = ApiCall(
    url, RequestMethods.get, {}, {'Authorization': token},
    response => onDataSuccess(dispatch, response, sensor_type),
    error => onDataError(dispatch, error)
  );
};

const onDataSuccess = (dispatch, response, sensor_type) => {
  if (response && response.meta.code === HttpStatus.ok ) {
    dispatch({
      type: sensor_type,
      payload: response.data
    });
  }
}

const onDataError = (dispatch, error) => {
  dispatch({ type: Device.data.fail });
  console.log('onError: ', error);
}

export const deviceTaskAction = (liter, device_id, token) => (dispatch) => {
  const data = ApiCall(
    DeviceEndpoints.sendTask + device_id,
    RequestMethods.put,
    {liter: liter},
    {'Authorization': token},
    response => onTaskSuccess(dispatch, response),
    error => onTaskError(dispatch, error)
  );
}

const onTaskSuccess = (dispatch, response) => {
  if (response && response.meta.code === HttpStatus.ok ) {
    dispatch({ type: Device.task.success });
    console.log('Sucessfully sent task: ', response);
  } else {
    dispatch({ type: Device.task.fail });
    console.log('Task sending failed: ', response);
  }
}

const onTaskError = (dispatch, error) => {
  dispatch({ type: Device.task.fail });
  console.log('Sending task to API failed: ', error);
}

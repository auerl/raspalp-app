import { Device } from '../actions/types';
import { actionStrings } from '../config/strings';

const INITIAL_STATE = {
  data_airtemp: [],
  data_humidity: [],
  data_moisture: [],
  data_soiltemp: [],
  data_range: [],
  message: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Device.sensor.range:
      return { ...state, data_range: action.payload, loading: false };
    case Device.sensor.airtemp:
      return { ...state, data_airtemp: action.payload, loading: false };
    case Device.sensor.soiltemp:
      return { ...state, data_soiltemp: action.payload, loading: false };
    case Device.sensor.humidity:
      return { ...state, data_humidity: action.payload, loading: false };
    case Device.sensor.moisture:
      return { ...state, data_moisture: action.payload, loading: false };
    case Device.task.fail:
      return { ...state, message: actionStrings.device.taskNotSent};
    case Device.task.success:
      return { ...state, message: actionStrings.device.taskSent};
    default:
      return state;
  }
};

import {
  DEVICE_DATA,
  DEVICE_DATA_SUCCESS,
  DEVICE_DATA_FAIL,
  DEVICE_TASK_SUCCESS,
  DEVICE_TASK_FAIL,
} from '../actions/types';

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
  // return { ...state, loading: true};
  switch (action.type) {
    case 'range':
      return { ...state, data_range: action.payload, loading: false };
    case 'airtemp':
      return { ...state, data_airtemp: action.payload, loading: false };
    case 'soiltemp':
      return { ...state, data_soiltemp: action.payload, loading: false };
    case 'humidity':
      return { ...state, data_humidity: action.payload, loading: false };
    case 'moisture':
      return { ...state, data_moisture: action.payload, loading: false };
    case DEVICE_TASK_FAIL:
      return { ...state, message: 'Bewässerungsauftrag nicht gesendet!'};
    case DEVICE_TASK_SUCCESS:
      return { ...state, message: 'Bewässerungsauftrag gesendet!'};
    default:
      return state;
  }
  // case DEVICE_DATA:
  //   return { ...state};
  // case DEVICE_DATA_FAIL:
  //   return { ...state, message: 'Device data could not be retrieved!', loading: false };
};

import {
  DEVICE_DATA,
  DEVICE_DATA_SUCCESS,
  DEVICE_DATA_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  data_airtemp: [],
  data_humidity: [],
  data_moisture: [],
  data_soiltemp: [],
  message: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case DEVICE_DATA:
      return { ...state};
    case 'airtemp':
      return { ...state, data_airtemp: action.payload };
    case 'soiltemp':
      return { ...state, data_soiltemp: action.payload };
    case 'humidity':
      return { ...state, data_humidity: action.payload };
    case 'moisture':
      return { ...state, data_moisture: action.payload };
    case DEVICE_DATA_FAIL:
      return { ...state, message: 'Device data could not be retrieved!', loading: false };

    default:
      return state;
  }
};

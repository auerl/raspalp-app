import {
  DEVICE_DATA,
  DEVICE_DATA_SUCCESS,
  DEVICE_DATA_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  data: {},
  message: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case DEVICE_DATA:
      return { ...state, loading: true, message: 'Data loading' };
    case DEVICE_DATA_SUCCESS:
      return { ...state, ...INITIAL_STATE, data: action.payload.data };
    case DEVICE_DATA_FAIL:
      return { ...state, message: 'Device data could not be retrieved!', loading: false };

    default:
      return state;
  }
};

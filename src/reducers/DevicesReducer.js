import {
  DEVICES,
  DEVICES_SUCCESS,
  DEVICES_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  data: [],
  message: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case DEVICES:
      return { ...state, loading: true, message: 'Device list loading' };
    case DEVICES_SUCCESS:
      return { ...state, ...INITIAL_STATE, data: action.payload };
    case DEVICES_FAIL:
      return { ...state, message: 'User devices could not be retrieved!', loading: false };

    default:
      return state;
  }
};

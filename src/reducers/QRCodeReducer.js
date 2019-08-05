import {
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_LOADING,
  DEVICE_ADD_FAIL_ALREADY_ADDED,
  DEVICE_ADD_FAIL_NOT_FOUND,
  DEVICE_ADD_SUCCESS,
  DEVICE_ADD_LOADING,
  DEVICE_REGISTER_FAIL,
  DEVICE_REGISTER_LOADING,
  DEVICE_REGISTER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  message: '',
  loading: false,
  authorized: false,
  registered: false,
  scanned: false,
  needToRegister: false,
  loginUser: {},
  userToken: '',
  userProfile: {},
  email: '',
  username: '',
  password:'',
  error: '',
  deviceAdded: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case DEVICE_ADD_SUCCESS:
      return { ...state, ...INITIAL_STATE, deviceAdded: true};
    case DEVICE_ADD_LOADING:
      return { ...state, ...INITIAL_STATE, loading:true};
    case DEVICE_ADD_FAIL_ALREADY_ADDED:
      return { ...state, ...INITIAL_STATE, error: 'deviceAlreadyAdded'};
    case DEVICE_ADD_FAIL_NOT_FOUND:
      return { ...state, ...INITIAL_STATE, needToRegister: true, error: 'deviceNotFound'};

    case DEVICE_REGISTER_SUCCESS:
      return { ...state, ...INITIAL_STATE, registered: true};
    case DEVICE_REGISTER_LOADING:
      return { ...state, ...INITIAL_STATE, loading:true};
    case DEVICE_REGISTER_FAIL:
      return { ...state, ...INITIAL_STATE, error: 'registrationFailed' };


    default:
      return state;
  }
};

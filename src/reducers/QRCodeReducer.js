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
  DEVICE_REGISTER_SUCCESS,
  DEVICE_LOGIN_FAIL,
  DEVICE_LOGIN_LOADING,
  DEVICE_LOGIN_SUCCESS,
  DEVICE_SETUP_FAIL,
  DEVICE_SETUP_LOADING,
  DEVICE_SETUP_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  message: '',
  loading: false,
  authorized: false,
  setup: false,
  registered: false,
  scanned: false,
  needToSetup: false,
  needToRegister: false,
  needToLogin: false,
  loginUser: {},
  userToken: '',
  userProfile: {},
  email: '',
  username: '',
  password:'',
  error: '',
  deviceAdded: false,
  deviceToken: '',
  deviceWifiSSID: '',
  deviceWifiPass: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case DEVICE_ADD_SUCCESS:
      return { ...state, error: '', deviceAdded: true};
    case DEVICE_ADD_LOADING:
      return { ...state, error: '', loading:true};
    case DEVICE_ADD_FAIL_ALREADY_ADDED:
      return { ...state, error: 'deviceAlreadyAdded'};
    case DEVICE_ADD_FAIL_NOT_FOUND:
      return { ...state, needToRegister: true, error: 'deviceNotFound'};

    case DEVICE_REGISTER_SUCCESS:
      return { ...state, error: '', registered: true};
    case DEVICE_REGISTER_LOADING:
      return { ...state, error: '', loading:true};
    case DEVICE_REGISTER_FAIL:
      return { ...state, error: 'registrationFailed' };

    case DEVICE_LOGIN_SUCCESS:
      return { ...state, error: '', deviceToken: action.payload.token, authorized: true, needToLogin: false, needToRegister: false, needToSetup: true, registered: false};
    case DEVICE_LOGIN_LOADING:
      return { ...state, error: '', loading:true};
    case DEVICE_LOGIN_FAIL:
      return { ...state, error: 'loginFailed' };

    case DEVICE_SETUP_SUCCESS:
      return { ...state, error: '', setup: true, needToSetup: false};
    case DEVICE_SETUP_LOADING:
      return { ...state, error: '', loading: true};
    case DEVICE_SETUP_FAIL:
      return { ...state, needToRegister: false, needToSetup: true, error: 'setupFailed' };


    default:
      return state;
  }
};

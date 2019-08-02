import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_LOADING,
} from '../actions/types';

import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOADING
} from '../config/strings';

const INITIAL_STATE = {
  message: '',
  loading: false,
  authorized: false,
  registered: false,
  loginUser: {},
  userToken: '',
  userProfile: {},
  email: '',
  username: '',
  password:'',
  error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, error:false, userToken: action.payload.token, authorized:true, loading:false, message: LOGIN_SUCCESS};
    case AUTH_LOADING:
      return { ...state, ...INITIAL_STATE, error:false, loading: true, message: LOADING };
    case AUTH_FAIL:
      return { ...state, ...INITIAL_STATE, error:true, message: LOGIN_ERROR };
    default:
      return state;
  }
};

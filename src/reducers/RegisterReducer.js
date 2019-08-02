import {
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_LOADING,
} from '../actions/types';

import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
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
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SIGNUP_SUCCESS:
      return { ...state, ...INITIAL_STATE, registered: true, email: action.payload.email, password: action.payload.password, loading:true,  message: REGISTER_SUCCESS};
    case SIGNUP_LOADING:
      return { ...state, ...INITIAL_STATE, loading:true,  message: LOADING};
    case SIGNUP_FAIL:
      return { ...state, ...INITIAL_STATE, message: REGISTER_ERROR };

    default:
      return state;
  }
};

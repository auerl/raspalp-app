import { Auth } from '../actions/types';
import { actionStrings } from '../config/strings';

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
    case Auth.login.success:
      return { ...state, error:false, userToken: action.payload.token, authorized:true, loading:false, message: actionStrings.login.success};
    case Auth.login.loading:
      return { ...state, ...INITIAL_STATE, error: false, loading: true, message: actionStrings.login.loading };
    case Auth.login.fail:
      return { ...state, ...INITIAL_STATE, error: true, message: actionStrings.login.error };
    default:
      return state;
  }
};

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
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Auth.signup.success:
      return { ...state, ...INITIAL_STATE, registered: true, email: action.payload.email, password: action.payload.password, loading:true,  message: actionStrings.signup.success};
    case Auth.signup.loading:
      return { ...state, ...INITIAL_STATE, loading:true,  message: actionStrings.signup.loading};
    case Auth.signup.fail:
      return { ...state, ...INITIAL_STATE, message: actionStrings.signup.error };
    default:
      return state;
  }
};

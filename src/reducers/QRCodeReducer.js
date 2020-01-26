import { Device } from '../actions/types';

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

    case Device.add.success:
      return { ...state, error: '', deviceAdded: true};
    case Device.add.loading:
      return { ...state, error: '', loading:true};
    case Device.add.failExists:
      return { ...state, error: 'deviceAlreadyAdded'};
    case Device.add.failNotFound:
      return { ...state, needToRegister: true, error: 'deviceNotFound'};

    case Device.register.success:
      return { ...state, error: '', registered: true};
    case Device.register.loading:
      return { ...state, error: '', loading:true};
    case Device.register.fail:
      return { ...state, error: 'registrationFailed' };

    case Device.login.success:
      return { ...state, error: '', deviceToken: action.payload.token, authorized: true, needToLogin: false, needToRegister: false, needToSetup: true, registered: false};
    case Device.login.loading:
      return { ...state, error: '', loading:true};
    case Device.login.fail:
      return { ...state, error: 'loginFailed' };

    case Device.setup.success:
      return { ...state, error: '', setup: true, needToSetup: false};
    case Device.setup.loading:
      return { ...state, error: '', loading: true};
    case Device.setup.fail:
      return { ...state, needToRegister: false, needToSetup: true, error: 'setupFailed' };


    default:
      return state;
  }
};

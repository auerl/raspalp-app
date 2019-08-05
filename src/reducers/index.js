import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import RegisterReducer from './RegisterReducer';
import DevicesReducer from './DevicesReducer';
import DeviceDataReducer from './DeviceDataReducer';
import FriendsReducer from './FriendsReducer';
import FriendDetailsReducer from './FriendDetailsReducer';
import QRCodeReducer from './QRCodeReducer';

export default combineReducers({
  login: LoginReducer,
  register: RegisterReducer,
  devices: DevicesReducer,
  deviceData: DeviceDataReducer,
  friends: FriendsReducer,
  friendDetails: FriendDetailsReducer,
  qrcode: QRCodeReducer,
});

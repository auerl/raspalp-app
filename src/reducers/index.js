import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import RegisterReducer from './RegisterReducer';
import DevicesReducer from './DevicesReducer';
import DeviceDataReducer from './DeviceDataReducer';
import PlanetsReducer from './PlanetsReducer';
import PlanetDetailsReducer from './PlanetDetailsReducer';

export default combineReducers({
  login: LoginReducer,
  register: RegisterReducer,
  planets: PlanetsReducer,
  devices: DevicesReducer,
  deviceData: DeviceDataReducer,
  planetDetails: PlanetDetailsReducer,
});

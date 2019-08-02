import React from 'react';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import SignInSignUp from './components/auth';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Tasks from './components/tasks'
import Devices from './components/devices';
import Settings from './components/settings';
import PlanetDetails from './components/details';
import DeviceData from './components/data';
import Search from './components/search'

import {
  TITLE_SIGNIN_SIGNUP,
  TITLE_LOGIN,
  TITLE_REGISTER,
  TITLE_SEARCH,
  TITLE_TASKS,
  TITLE_DEVICES,
  TITLE_SETTINGS,
  TITLE_DATA,
  LOGOUT,
  BACK,
} from './config/strings';

import {
  Component,
  Image,
  View
} from 'react-native';

const TabIcon = ({ selected, title, image }) => {
  const selectColor = selected ? '#ED1B25' : '#FFF'
  return (
    <View style={{borderBottomColor: selectColor}}>
      <Image
        style={{height: 20, width: 20}}
        source={image}
      />
    </View>
  )
}

const RouterComponent = () => {
  return (
    <Router>
      <Scene>
        <Scene key="loginregister"
          component={SignInSignUp}
          title={TITLE_SIGNIN_SIGNUP}
          hideNavBar
        />
        <Scene key="login"
          component={Login}
          title={TITLE_LOGIN}
        />
        <Scene key="register"
          component={Register}
          title={TITLE_REGISTER}
        />
        <Scene key='dashboard' tabs={true} tabBarPosition="bottom" hideNavBar>
          <Scene
            key="devices"
            image={require('../assets/monitor.png')}
            icon={TabIcon}
            component={Devices}
            title={TITLE_DEVICES}
          />
          <Scene
            key="tasks"
            image={require('../assets/monitor.png')}
            icon={TabIcon}
            component={Tasks}
            title={TITLE_TASKS}
          />
          <Scene
            key="search"
            image={require('../assets/avatar.png')}
            icon={TabIcon}
            component={Search}
            title={TITLE_SEARCH}
          />
          <Scene
            key="settings"
            image={require('../assets/settings.png')}
            icon={TabIcon}
            component={Settings}
            title={TITLE_SETTINGS}
            rightTitle={LOGOUT}
            onRight={() => Actions.loginregister({ type: ActionConst.RESET })}
          />
        </Scene>
        <Scene
          key="planetDetails"
          backTitle={BACK}
          component={PlanetDetails}
          title={TITLE_SEARCH}
        />
        <Scene
          key="deviceData"
          backTitle={BACK}
          component={DeviceData}
          title={TITLE_DATA}
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;

import React from 'react';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';

import SignInSignUp from './components/auth';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Tasks from './components/tasks'
import Devices from './components/devices';
import Settings from './components/settings';
import FriendDetails from './components/friends/details';
import DeviceData from './components/data';
import Friends from './components/friends';
import QRCode from './components/qrcode';

import {
  TITLE_SIGNIN_SIGNUP,
  TITLE_LOGIN,
  TITLE_REGISTER,
  TITLE_FRIENDS,
  TITLE_TASKS,
  TITLE_DEVICES,
  TITLE_SETTINGS,
  TITLE_DATA,
  TITLE_QRCODE,
  LOGOUT,
  BACK,
} from './config/strings';

import {
  StyleSheet,
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

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#c4c4c4', // changing navbar color
  },
  navTitle: {
    fontFamily: 'Roboto',
    color: 'white'
  },
})

const RouterComponent = () => {
  return (
    <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle}>
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
            image={require('../assets/vector.png')}
            icon={TabIcon}
            component={Tasks}
            title={TITLE_TASKS}
          />
          <Scene
            key="friends"
            image={require('../assets/avatar.png')}
            icon={TabIcon}
            component={Friends}
            title={TITLE_FRIENDS}
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
          key="friendDetails"
          backTitle={BACK}
          component={FriendDetails}
          title={TITLE_FRIENDS}
        />
        <Scene
          key="deviceData"
          backTitle={BACK}
          component={DeviceData}
          title={TITLE_DATA}
        />
        <Scene
          key="QRCode"
          backTitle={BACK}
          component={QRCode}
          title={TITLE_QRCODE}
        />
      </Scene>
    </Router>
  );
};


export default RouterComponent;

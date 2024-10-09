/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home/Home';
import Login from '../screens/login/login';
import Boulders from '../screens/boulders/Boulders';
import NewUser from '../screens/newUser/NewUser';
import { RootStackParamList } from '../interfaces/types';
import ScanQr from '../screens/scanQR/ScanQr';
import DetallesVia from '../screens/detallesVia/DetallesVia';
import Vias from '../screens/vias/Vias';
import NewRoute from '../screens/newRoute/NewRoute';
import NewVideo from '../screens/newVideo/NewVideo';
import Videos from '../screens/videos/Videos';
import React from 'react';

const Stack = createStackNavigator<RootStackParamList>();

export const Navigator = () => {
  return (

      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewUser" component={NewUser} />
        <Stack.Screen name="Boulders" component={Boulders} />
        <Stack.Screen name="ScanQr" component={ScanQr} />
        <Stack.Screen name="DetallesVia" component={DetallesVia} />
        <Stack.Screen name="Vias" component={Vias} />
        <Stack.Screen name="NewRoute" component={NewRoute} />
        <Stack.Screen name="NewVideo" component={NewVideo} />
        <Stack.Screen name="Videos" component={Videos} />
      </Stack.Navigator>

  );
};

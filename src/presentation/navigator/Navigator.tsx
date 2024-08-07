/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';
import Boulders from '../screens/boulders/Boulders';
import NewUser from '../screens/newUser/NewUser';
import { RootStackParamList } from '../interfaces/types';
import ScanQr from '../screens/scanQR/ScanQr';
import DetallesVia from '../screens/detallesVia/DetallesVia';
import Vias from '../screens/vias/Vias';

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
      </Stack.Navigator>

  );
};

/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';
import Boulders from '../screens/boulders/Boulders';
import NewUser from '../screens/newUser/NewUser';
import { RootStackParamList } from '../interfaces/types';

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
      </Stack.Navigator>

  );
};

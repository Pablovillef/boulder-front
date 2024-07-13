/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';

const Stack = createStackNavigator();

export const Navigator = () => {
  return (

      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>

  );
};

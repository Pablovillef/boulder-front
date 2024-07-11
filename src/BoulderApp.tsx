/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './presentation/screens/login/login';


const Stack = createStackNavigator();

export const BoulderApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

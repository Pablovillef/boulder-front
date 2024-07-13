/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Navigator } from './presentation/navigator/Navigator';

export const BoulderApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

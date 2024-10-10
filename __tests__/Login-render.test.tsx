/* eslint-disable prettier/prettier */
/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import Login from '../src/presentation/screens/login/login';

import { NavigationContainer } from '@react-navigation/native';

test('La pantalla de Login se renderiza correctamente', () => {
  const { getByPlaceholderText, getByText } = render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );

  // Verificar que los campos de email y contraseña estén presentes
  expect(getByPlaceholderText('Email')).toBeTruthy();
  expect(getByPlaceholderText('Password')).toBeTruthy();

  // Verificar que el texto del botón de iniciar sesión esté presente
  expect(getByText('SIGN IN')).toBeTruthy();
});

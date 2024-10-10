/* eslint-disable prettier/prettier */
/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import Login from '../src/presentation/screens/login/login';

import { NavigationContainer } from '@react-navigation/native';

/*
Verifica que la pantalla de inicio de sesión (Login) se renderice correctamente
y que todos los elementos esenciales de la interfaz estén presentes
*/
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

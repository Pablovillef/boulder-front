/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import Login from '../src/presentation/screens/login/login';
import React from 'react';

// Mockeamos el hook useNavigation (Para devolver un objeto que contiene un mock de la función navigate)
jest.mock('@react-navigation/native', () => {
    return {
      ...jest.requireActual('@react-navigation/native'),
      useNavigation: () => ({
        navigate: jest.fn(),
      }),
    };
});

/*
Verifica el estado y valor de los campos Email y Password cuando se ingresan valores,
asegurando que sean los esperados
*/
test('Permite al usuario ingresar email y contraseña', () => {

    const { getByPlaceholderText } = render(
        <NavigationContainer>
          <Login />
        </NavigationContainer>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'usuario@example.com');
    fireEvent.changeText(passwordInput, '123456');

    expect(emailInput.props.value).toBe('usuario@example.com');
    expect(passwordInput.props.value).toBe('123456');
});


/*
Verifica la interacción con el botón de inicio de sesión ("SIGN IN") y
asegurarse de que, al no ingresar credenciales (email y contraseña), no se navega a otra pantalla
*/
test('El botón de SIGN IN llama a la función de inicio de sesión', async () => {

    const { getByText } = render(
        <NavigationContainer>
          <Login />
        </NavigationContainer>
      );

    const signInButton = getByText('SIGN IN');

    fireEvent.press(signInButton);
    expect(require('@react-navigation/native').useNavigation().navigate).not.toHaveBeenCalled();
});

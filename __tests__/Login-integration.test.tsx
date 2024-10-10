/* eslint-disable prettier/prettier */
import axios from 'axios';
import { act } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import Login from '../src/presentation/screens/login/login';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';

jest.mock('axios');

const mockNavigate = jest.fn(); // Mock explícito fuera de la función de prueba

// Mockeamos el hook useNavigation (Para devolver un objeto que contiene un mock de la función navigate)
jest.mock('@react-navigation/native', () => {
    return {
      ...jest.requireActual('@react-navigation/native'),
      useNavigation: () => ({
        navigate: mockNavigate,
      }),
    };
});

// Mockeamos Alert.alert para poder verificar si fue llamada
jest.spyOn(Alert, 'alert');

const mockedAxios = axios as jest.Mocked<typeof axios>;



/*
En este test se comprueba que tras una navegación exitosa, verifica
que la app navegue correctamente a la pantalla "Home", y que los datos
del usuario se pasen de forma correcta.
*/
test('Llamada exitosa de inicio de sesión navega a la pantalla Home', async () => {

    mockedAxios.post.mockResolvedValueOnce({
        data: { id: 1, name: 'Test User' },
    });

    const { getByText, getByPlaceholderText } = render(
        <NavigationContainer>
            <Login />
        </NavigationContainer>
    );

    // Simular entrada de texto para email y password
    fireEvent.changeText(getByPlaceholderText('Email'), 'usuario@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');

    // Ejecutar el evento de login
    await act(async () => {
        fireEvent.press(getByText('SIGN IN'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('Home', { user: { id: 1, name: 'Test User' } });
});

/*
En este test se comprueba que tras una navegación fallida, se
muestra una Alerta con el error.
*/
test('Muestra una alerta cuando la llamada de inicio de sesión falla', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Error en la API'));

    jest.spyOn(Alert, 'alert');

    const { getByText, getByPlaceholderText } = render(
        <NavigationContainer>
            <Login />
        </NavigationContainer>
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'usuario@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');

    await act(async () => {
      fireEvent.press(getByText('SIGN IN'));
    });

    // Esperar un momento para que el Alert pueda ser llamado
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'An error occurred. Please try again.');
  });

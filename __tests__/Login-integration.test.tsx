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
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

const mockedAxios = axios as jest.Mocked<typeof axios>;

// Resetea todos los mocks después de cada prueba
afterEach(() => {
    jest.clearAllMocks();
});



/*
Test con navegación exitosa. Verifica
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

// Test para manejar un error de conexión
test('Muestra alerta de error de red cuando no hay conexión', async () => {
    mockedAxios.post.mockRejectedValueOnce({ code: 'ERR_NETWORK' });

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

    expect(Alert.alert).toHaveBeenCalledWith('Error de Red', 'Verifica tu conexión a Internet e inténtalo nuevamente.');
});

// Test para manejar usuario no encontrado (404)
test('Muestra alerta de usuario no encontrado', async () => {
    mockedAxios.post.mockRejectedValueOnce({
        response: { status: 404, data: 'User not found' },
    });

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

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Usuario no encontrado. Verifica tus credenciales.');
});


// Test para manejar credenciales inválidas (401)
test('Muestra alerta de credenciales inválidas', async () => {
    mockedAxios.post.mockRejectedValueOnce({
        response: { status: 401, data: 'Invalid credentials' },
    });

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

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Credenciales inválidas. Intenta de nuevo.');
});


// Test para manejar un error general
test('Muestra alerta de error general', async () => {
    mockedAxios.post.mockRejectedValueOnce({
        response: { data: 'An unexpected error occurred' },
    });

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

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'An unexpected error occurred');
});

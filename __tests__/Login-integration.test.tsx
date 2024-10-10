/* eslint-disable prettier/prettier */
import axios from 'axios';
import { act } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import Login from '../src/presentation/screens/login/login';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('axios');

const mockNavigate = jest.fn(); // Mock explícito fuera de la función de prueba

// Mockeamos el hook useNavigation (Para devolver un objeto que contiene un mock de la función navigate)
jest.mock('@react-navigation/native', () => {
    return {
      ...jest.requireActual('@react-navigation/native'),
      useNavigation: () => ({
        navigate: mockNavigate, // Mock de la función navigate
      }),
    };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

test('Llamada exitosa de inicio de sesión navega a la pantalla Home', async () => {

    // Set up the mock response for axios post
    mockedAxios.post.mockResolvedValueOnce({
        data: { user: { id: 1, name: 'Test User' } },
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

/* eslint-disable prettier/prettier */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login  from '../login';

describe('Login Component', () => {
  test('should update email and password state on input change', () => {
    const { getByPlaceholderText } = render(<Login />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@gmail.com');
    fireEvent.changeText(passwordInput, 'test');

    expect(emailInput.props.value).toBe('test@gmail.com');
    expect(passwordInput.props.value).toBe('test');
  });
});

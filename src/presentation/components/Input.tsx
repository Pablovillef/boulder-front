/* eslint-disable prettier/prettier */
import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';

const Input: React.FC<TextInputProps> = props => {
  return <TextInput style={styles.input} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Input;

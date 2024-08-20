/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { LoginScreenNavigationProp } from '../../interfaces/types';

const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleCamera = () => {
    navigation.navigate('ScanQr', { user: null }); // No hay usuario todavía porque no se ha iniciado sesión
  };

  const handleSignIn = async () => {

    try{

      const response = await axios.post('http://192.168.7.174:8080/api/v1/auth/login', {
        email,
        password,
      });

      const userData = response.data;
      navigation.navigate('Home', { user: userData });

    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }

  };

  const handleRegister = () => {
    navigation.navigate('NewUser');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN INTO YOUR ACCOUNT</Text>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity>
        <Text style={styles.forgot}>FORGOT YOUR PASSWORD?</Text>
      </TouchableOpacity>
      <Button
        title="SIGN IN"
        style={styles.signInButton}
        textStyle={styles.signInText}
        onPress={handleSignIn}
      />
      <Button
        title="REGISTER"
        style={styles.registerButton}
        textStyle={styles.registerText}
        onPress={handleRegister}
      />
      <Button
        title="SCAN QR"
        style={styles.scanButton}
        textStyle={styles.scanButtonText}
        onPress={handleCamera}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  forgot: {
    color: '#000',
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#B9FF00',
  },
  signInText: {},
  registerButton: {
    backgroundColor: '#FF6C00',
  },
  registerText: {},
  scanButton: {
    width: '80%',
    height: 100,
    marginTop: 20,
    backgroundColor: '#b3e0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;

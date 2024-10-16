/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { LoginScreenNavigationProp } from '../../interfaces/types';
import { API_BASE_URL_PRO } from '../../../config/config';
import background from '../../../assets/img/background.jpg';


const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleCamera = () => {
    navigation.navigate('ScanQr', { user: null }); // No hay usuario todavía porque no se ha iniciado sesión
  };

  const handleSignIn = async () => {

    try{
      console.log(`${API_BASE_URL_PRO}/auth/login`);
      const response = await axios.post(`${API_BASE_URL_PRO}/auth/login`, {
        email,
        password,
      }, { timeout: 3000 });
      const userData = response.data;
      navigation.navigate('Home', { user: userData});

    } catch (error: any) {
      // Manejo de errores de conexión
      if (error.code === 'ERR_NETWORK') {
        Alert.alert('Error de Red', 'Verifica tu conexión a Internet e inténtalo nuevamente.');
      } else if (error.response) {
        // Manejo de errores de autenticación
        if (error.response.status === 404) {
          Alert.alert('Error', 'Usuario no encontrado. Verifica tus credenciales.');
        } else if (error.response.status === 401) {
          Alert.alert('Error', 'Credenciales inválidas. Intenta de nuevo.');
        } else {
          const message = error.response.data || 'Ocurrió un error. Intenta de nuevo.';
          Alert.alert('Error', message);
        }
      } else {
        console.error('PATATA ' + error.response.status);
        Alert.alert('Error', 'Ocurrió un error inesperado. Intenta de nuevo.');
      }
    }

  };

  const handleRegister = () => {
    navigation.navigate('NewUser');
  };

  return (
    <ImageBackground source={background} style={styles.background}>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  forgot: {
    color: '#cacaca',
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#000',
    borderWidth: 1,
  },
  signInText: {
    color: '#fff',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#000',
    borderWidth: 1,
  },
  registerText: {
    color: '#fff',
  },
  scanButton: {
    width: '80%',
    height: 100,
    marginTop: 20,
    backgroundColor: '#42A5F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Login;

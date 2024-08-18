/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HomeProps } from '../../interfaces/types';
import axios from 'axios';

const Home: React.FC<HomeProps> = ({ navigation, route }) => {

  const { user } = route.params;

  const fetchBoulderData = async () => {
    try {
      const response = await axios.get('http://192.168.7.174:8080/api/v1/boulders'); // TODO: Si es worker, pasa directamente a la vista de las vias de su Rocodromo. Meter en el back un atributo boulder en el usuario, si es worker.
      const boulderData = response.data;
      navigation.navigate('Boulders', { boulderData });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCamera = () => {
    navigation.navigate('ScanQr');
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleNewRoute = () => {
    navigation.navigate('NewRoute');
  };

  const isAdminOrWorker = user.role === 'ADMIN' || user.role === 'WORKER';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>HOME</Text>
        {/* Subtitulo: Trabajador del rocodromo: user.getRocodromo */}
      </View>
      <TouchableOpacity style={styles.button} onPress={fetchBoulderData}>
        <Text style={styles.buttonText}>
          {user.role === 'WORKER' ? 'Ver Rocódromo' : 'Ver Rocódromos'}
        </Text>
      </TouchableOpacity>
      {isAdminOrWorker && (
        <TouchableOpacity style={styles.button} onPress={handleNewRoute}>
          <Text style={styles.buttonText}>Crear Vía</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.scanButton} onPress={handleCamera}>
        <Text style={styles.scanButtonText}>SCAN QR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logOutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    width: '100%',
    backgroundColor: '#ccff00',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    padding: 15,
    margin: 10,
    borderColor: '#000',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  scanButton: {
    width: '80%',
    padding: 20,
    marginTop: 20,
    backgroundColor: '#b3e0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton:{
    width: '80%',
    height: 60,
    marginTop: 20,
    backgroundColor: '#f55252',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logOutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;

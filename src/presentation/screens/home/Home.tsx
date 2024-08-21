/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HomeProps } from '../../interfaces/types';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/config';

const Home: React.FC<HomeProps> = ({ navigation, route }) => {

  const { user } = route.params;

  const fetchBoulderData = async () => {
    try {

      // Si es worker, pasa directamente a la vista de las vias de su Rocodromo.
      const url = user.role === 'WORKER'
      ? `${API_BASE_URL}/boulder/${user.boulder.idBoulder}/routes` // URL para rol WORKER
      : `${API_BASE_URL}/boulders`; // URL para otros roles

      const response = await axios.get(url);
      const boulderData = response.data;

      if(user.role === 'WORKER'){ // Si es WORKER, navega directamente a las rutas de su rocódromo

        const boulder = user.boulder; // Datos del rocodromo para pasarlo por props a Vias

        console.log('Boulder:', boulder);
        console.log('boulderData.boulder:', boulderData);

        navigation.navigate('Vias', { boulder, routesData: boulderData, user }); // Se incluye user para restringir la navegabilidad desde Vias en funcion del rol

      } else {
        // Para otros roles, navega a la vista de Rocódromos
        navigation.navigate('Boulders', { boulderData });
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleCamera = () => {
    navigation.navigate('ScanQr', { user });
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleNewRoute = () => {
    navigation.navigate('NewRoute', { user } );
  };

  const handleNewVideo = () => {
    navigation.navigate('NewVideo', { user } );
  };

  const handleVideos = () => {
    navigation.navigate('Videos');
  };

  const isAdminOrWorker = user.role === 'ADMIN' || user.role === 'WORKER';
  const isWorker = user.role === 'WORKER';
  const isUser = user.role === 'USER';


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>HOME</Text>
      </View>
      {isWorker && (
        <View style={styles.headerWorkerData}>
          <Text style={styles.subtitle}>Trabajador del rocódromo: {user.boulder.name}</Text>
          <Text style={styles.subtitle}>Usuario: {user.name}</Text>
        </View>
      )}
      {isUser && (
      <View style={styles.headerUserData}>
        <Text style={styles.subtitle}>Usuario: {user.name}</Text>
      </View>
      )}
      <TouchableOpacity style={styles.button} onPress={fetchBoulderData}>
        <Text style={styles.buttonText}>
          {user.role === 'WORKER' ? `${user.boulder.name}` : 'Ver Rocódromos'}
        </Text>
      </TouchableOpacity>
      {isAdminOrWorker && (
        <TouchableOpacity style={styles.button} onPress={handleNewRoute}>
          <Text style={styles.buttonText}>Crear Vía</Text>
        </TouchableOpacity>
      )}

      {isUser && (
      <>
      <TouchableOpacity style={styles.button} onPress={handleNewVideo}>
        <Text style={styles.buttonText}>Subir Video</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleVideos}>
        <Text style={styles.buttonText}>Mis Videos</Text>
      </TouchableOpacity>
      </>
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
  headerWorkerData: {
    marginTop: 5,
    width: '100%',
    backgroundColor: '#17bd93',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerUserData: {
    marginTop: 5,
    width: '100%',
    backgroundColor: '#17bd93',
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
  subtitle: {
    paddingTop: 20,
    color: '#000',
    marginBottom: 20,
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

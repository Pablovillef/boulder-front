/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { HomeProps } from '../../interfaces/types';
import axios from 'axios';

import { API_BASE_URL_PRO } from '../../../config/config';

import background from '../../../assets/img/background.jpg';


const Home: React.FC<HomeProps> = ({ navigation, route }) => {

  const { user } = route.params;
  console.log('Route params:', route.params);

  const fetchBoulderData = async () => {
    try {

      // Si es worker, pasa directamente a la vista de las vias de su Rocodromo.
      const url = user.role === 'WORKER'
      ? `${API_BASE_URL_PRO}/boulder/${user.boulder.idBoulder}/routes` // URL para rol WORKER
      : `${API_BASE_URL_PRO}/boulders`; // URL para otros roles


      const response = await axios.get(url);
      const boulderData = response.data;

      if(user.role === 'WORKER'){ // Si es WORKER, navega directamente a las rutas de su rocódromo

        const boulder = user.boulder; // Datos del rocodromo para pasarlo por props a Vias

        console.log('Boulder:', boulder);
        console.log('boulderData.boulder:', boulderData);

        navigation.navigate('Vias', { boulder, routesData: boulderData, user }); // Se incluye user para restringir la navegabilidad desde Vias en funcion del rol

      } else {
        // Para otros roles, navega a la vista de Rocódromos
        navigation.navigate('Boulders', { boulderData, user });
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

  const handleNewVideo = async () => {
    try{
      const response = await axios.get(`${API_BASE_URL_PRO}/boulders`);
      const boulders = response.data;
      console.log(boulders);
      navigation.navigate('NewVideo', { user, boulders } );
    }catch(error){
      console.error(error);
    }
  };

  const handleVideos = async () => {
    try{
      const response = await axios.get(`${API_BASE_URL_PRO}/user/${user.idUser}/videos`);
      const videoDetails = response.data;
      navigation.navigate('Videos', { videos: videoDetails, user } );
    }catch(error){
      console.error(error);
    }
  };

  const isAdminOrWorker = user.role === 'ADMIN' || user.role === 'WORKER';
  const isWorker = user.role === 'WORKER';
  const isUser = user.role === 'USER';


  return (
    <>
    <ImageBackground source={background} style={styles.background}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>HOME</Text>
      </View>
      {isWorker && (
        <View style={styles.headerWorkerData}>
          <Text style={styles.subtitle}>Trabajador del rocódromo: {user.boulder.name}</Text>
          <Text style={styles.subtitle}>Usuario: {user.name + ' ' + user.surname}</Text>
        </View>
      )}
      {isUser && (
      <View style={styles.headerUserData}>
        <Text style={styles.subtitle}>Usuario: {user.name + ' ' + user.surname}</Text>
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
    </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    width: '100%',
    backgroundColor: '#42A5F5',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerWorkerData: {
    marginTop: 5,
    width: '100%',
    backgroundColor: '#42A5F5',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerUserData: {
    marginTop: 5,
    width: '100%',
    backgroundColor: '#42A5F5',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    width: '80%',
    padding: 15,
    margin: 10,
    borderColor: '#000',
    backgroundColor: '#4CAF50',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  scanButton: {
    width: '80%',
    padding: 20,
    marginTop: 130,
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
  subtitle: {
    paddingTop: 20,
    color: '#000',
    marginBottom: 20,
  },
  logoutButton:{
    width: '80%',
    height: 60,
    marginTop: 20,
    backgroundColor: '#F44336',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  logOutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Home;

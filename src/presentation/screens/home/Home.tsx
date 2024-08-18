/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HomeProps } from '../../interfaces/types';
import axios from 'axios';

const Home: React.FC<HomeProps> = ({ navigation, route }) => {

  const { user } = route.params;

  const fetchBoulderData = async () => {
    try {
      const response = await axios.get('http://192.168.7.174:8080/api/v1/boulders');
      const boulderData = response.data;
      navigation.navigate('Boulders', { boulderData });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCamera = () => {
    navigation.navigate('ScanQr');
  };

  const isAdminOrWorker = user.role === 'ADMIN' || user.role === 'WORKER';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>HOME</Text>
      </View>
      {isAdminOrWorker && (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Añadir Rocódromo</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={fetchBoulderData}>
        <Text style={styles.buttonText}>Ver Rocódromos</Text>
      </TouchableOpacity>
      {isAdminOrWorker && (
        <>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Subir video</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.configButton}>
          <Text style={styles.buttonText}>Ver todo</Text>
        </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={styles.scanButton} onPress={handleCamera}>
        <Text style={styles.scanButtonText}>SCAN QR</Text>
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
  configButton: {
    width: '40%',
    padding: 10,
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
});

export default Home;

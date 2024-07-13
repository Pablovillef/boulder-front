/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { HomeScreenNavigationProp } from '../../interfaces/types';


interface HomeProps {
  navigation: HomeScreenNavigationProp;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {

  const fetchBoulderData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/mock/boulder/info');
      const boulderData = response.data;
      navigation.navigate('Boulders', { boulderData });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>HOME</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Añadir Rocódromo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Añadir Vía</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Subir video</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.configButton} onPress={fetchBoulderData}>
        <Text style={styles.buttonText}>Ver todo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.scanButton}>
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

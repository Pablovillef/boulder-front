/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { BouldersScreenRouteProp, RootStackParamList } from '../../interfaces/types';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';

import { API_BASE_URL_LOCAL } from '../../../config/config';

import background from '../../../assets/img/background.jpg';


type NavigationProp = StackNavigationProp<RootStackParamList, 'Vias'>;

const Boulders: React.FC = () => {

    const boulder = useRoute<BouldersScreenRouteProp>();
    const navigation = useNavigation<NavigationProp>();

    const { boulderData, user } = boulder.params;

    const handlePress = async (boulder: any) => {
        try {
          const response = await axios.get(`${API_BASE_URL_LOCAL}/boulder/${boulder.idBoulder}/routes`);
          const routesData = response.data;
          navigation.navigate('Vias', { boulder, routesData, user });
        } catch (error) {
          console.error(error);
        }
      };

    return (
      <>
      <ImageBackground source={background} style={styles.background}>

      <View style={styles.header}>
        <Text style={styles.headerText}>ROCÓDROMOS</Text>
      </View>

        <FlatList
            data={boulderData}
            keyExtractor={(item) => item.idBoulder.toString()}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() => handlePress(item)}>
                    <View style={styles.boulderContainer}>
                        <Text style={styles.boulderText}>Nombre: {item.name}</Text>
                        <Text style={styles.boulderText}>Dirección: {item.address}</Text>
                        <Text style={styles.boulderText}>Localidad: {item.locality}</Text>
                        <Text style={styles.boulderText}>Email: {item.mail}</Text>
                        <Text style={styles.boulderText}>Teléfono: {item.phone}</Text>

                        {item.phone2 && <Text style={styles.boulderText}>Teléfono 2: {item.phone2}</Text>}
                    </View>
                </TouchableOpacity>
            )}
        />

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Home', { user })}>
          <Text style={styles.cancelButtonText}>VOLVER</Text>
        </TouchableOpacity>
        </ImageBackground>
      </>
    );
};

const styles = StyleSheet.create({

  header: {
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
  background: {
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#F44336',
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
    boulderContainer: {
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
      borderColor:  '#000',
      borderWidth: 1,
      backgroundColor: '#e2e2e2',
    },
    boulderText: {
      fontSize: 16,
    },
  });

export default Boulders;

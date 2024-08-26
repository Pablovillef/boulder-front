/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity  } from 'react-native';
import { useRoute, useNavigation  } from '@react-navigation/native';
import { RootStackParamList, Route, ViasScreenRouteProp } from '../../interfaces/types';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { API_BASE_URL_LOCAL } from '../../../config/config';

type NavigationProp = StackNavigationProp<RootStackParamList, 'DetallesVia'>;

const Vias: React.FC = () => {
  const route = useRoute<ViasScreenRouteProp>();
  const {boulder, routesData, user} = route.params;
  const navigation = useNavigation<NavigationProp>();

  console.log('Boulder:', boulder);
  console.log('RoutesData:', routesData);

  const handleRoutePress = async (route: Route) => {
    try {
      const response = await axios.get(`${API_BASE_URL_LOCAL}/boulder/${boulder.name}/route/${route.idRoute}`);
      const routeDetails = response.data;
      navigation.navigate('DetallesVia', { viaData: routeDetails, user }); // Se incluye el user para restringir la navegabilidad desde Vias en funcion del rol
    } catch (error) {
      console.error(error);
    }
  };

  const handleBouldersPress = async () => {
    if(user?.role !== 'WORKER'){
      try {
        const response = await axios.get(`${API_BASE_URL_LOCAL}/boulders`);
        const boulderData = response.data;
        navigation.navigate('Boulders', { boulderData, user });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleBackButton = async () => {
    navigation.navigate('Home', { user });
  };

  const isWorker = user.role === 'WORKER';

  return (
    <>
    <View style={styles.container}>
      <View style={styles.headerBoulderData}>
        <TouchableOpacity style={styles.header} onPress={() => handleBouldersPress()}>
          <Text style={styles.headerText}>Rocódromo: {boulder.name}</Text>
          <Text style={styles.headerText}>Dirección: {boulder.address}</Text>
          <Text style={styles.headerText}>Localidad: {boulder.locality}</Text>
          <Text style={styles.headerText}>Email: {boulder.mail}</Text>
          <Text style={styles.headerText}>Teléfono: {boulder.phone}</Text>
          {boulder.phone2 && (
            <Text style={styles.headerText}>Teléfono 2: {boulder.phone2}</Text>
          )}
        </TouchableOpacity>
        {isWorker && (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Editar Rocódromo</Text>
        </TouchableOpacity>
        )}
      </View>
      <View>
        <FlatList
          data={routesData}
          keyExtractor={item => item.idRoute.toString()}
          renderItem={({item}) => (
          <>
              <View style={styles.routeContainer}>
                <TouchableOpacity style={styles.routeTextContainer} onPress={() => handleRoutePress(item)}>
                  <Text style={styles.routeText}>Nombre: {item.name}</Text>
                  <Text style={styles.routeText}>Tipo: {item.typeRoute}</Text>
                  <Text style={styles.routeText}>Nivel: {item.num_nivel}</Text>
                  <Text style={styles.routeText}>Presa: {item.presa}</Text>
                  <Text style={styles.routeText}>Creación: {new Date(item.creationDate).toLocaleDateString()}</Text>
                </TouchableOpacity>
                {isWorker && (
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>✏️</Text>
                </TouchableOpacity>
                )}
              </View>
          </>
          )}
        />

      </View>
    </View>


    <TouchableOpacity style={styles.cancelButton} onPress={() => handleBackButton()}>
      <Text style={styles.cancelButtonText}>VOLVER</Text>
    </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  editButton: {
    padding: 10,
    backgroundColor: '#fbff00',
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 1,

  },
  editButtonText: {
    fontSize: 18,
    backgroundColor: '#fbff00',
  },
  routeTextContainer: {
    flex: 1,
  },
  button: {
    width: '80%',
    padding: 15,
    margin: 10,
    borderColor: '#000',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fbff00',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#FF6600',
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    header: {
      padding: 10,
      backgroundColor: '#d0f0b3',
      borderRadius: 10,
      borderColor: '#000',
      borderWidth: 1,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    routeContainer: {
      flexDirection: 'row',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
      borderColor: '#000',
      borderWidth: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    routeText: {
      fontSize: 16,
    },
    headerBoulderData: {
      width: '100%',
      backgroundColor: '#17bd93',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Vias;

/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity  } from 'react-native';
import { useRoute, useNavigation  } from '@react-navigation/native';
import { RootStackParamList, Route, ViasScreenRouteProp } from '../../interfaces/types';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

type NavigationProp = StackNavigationProp<RootStackParamList, 'DetallesVia'>;

const Vias: React.FC = () => {
  const route = useRoute<ViasScreenRouteProp>();
  const {boulder, routesData, user} = route.params;
  const navigation = useNavigation<NavigationProp>();

  console.log('Boulder:', boulder);
  console.log('RoutesData:', routesData);

  const handleRoutePress = async (route: Route) => {
    try {
      const response = await axios.get(`http://192.168.62.215:8080/api/v1/boulder/${boulder.name}/route/${route.idRoute}`);
      const routeDetails = response.data;
      navigation.navigate('DetallesVia', { viaData: routeDetails, user }); // Se incluye el user para restringir la navegabilidad desde Vias en funcion del rol
    } catch (error) {
      console.error(error);
    }
  };

  const handleBouldersPress = async () => {
    if(user?.role !== 'WORKER'){
      try {
        const response = await axios.get('http://192.168.62.215:8080/api/v1/boulders');
        const boulderData = response.data;
        navigation.navigate('Boulders', { boulderData });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => handleBouldersPress()}>
        <Text style={styles.headerText}>Nombre: {boulder.name}</Text>
        <Text style={styles.headerText}>Dirección: {boulder.address}</Text>
        <Text style={styles.headerText}>Localidad: {boulder.locality}</Text>
        <Text style={styles.headerText}>Email: {boulder.mail}</Text>
        <Text style={styles.headerText}>Teléfono: {boulder.phone}</Text>
        {boulder.phone2 && (
          <Text style={styles.headerText}>Teléfono 2: {boulder.phone2}</Text>
        )}
      </TouchableOpacity>
      <FlatList
        data={routesData}
        keyExtractor={item => item.idRoute.toString()}
        renderItem={({item}) => (
        <TouchableOpacity onPress={() => handleRoutePress(item)}>
          <View style={styles.routeContainer}>
            <Text style={styles.routeText}>Nombre: {item.name}</Text>
            <Text style={styles.routeText}>Tipo: {item.typeRoute}</Text>
            <Text style={styles.routeText}>Nivel: {item.num_nivel}</Text>
            <Text style={styles.routeText}>Presa: {item.presa}</Text>
            <Text style={styles.routeText}>Creación: {new Date(item.creationDate).toLocaleDateString()}</Text>
          </View>
        </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      padding: 10,
      backgroundColor: '#f8f8f8',
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    routeContainer: {
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
      borderColor: '#ccc',
      borderWidth: 1,
    },
    routeText: {
      fontSize: 16,
    },
  });

export default Vias;

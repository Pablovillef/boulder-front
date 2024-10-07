/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Modal, Alert  } from 'react-native';
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

  const [routeList, setRouteList] = useState<Route[]>(routesData); // Estado para la lista de videos

  const [editingRoute, setEditingRoute] = useState<Route | null>(null); // Video en edición
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false); // Estado para el modal
  const [editQrRoute, setEditQrRoute] = useState<string>('');
  const [editName, setEditName] = useState<string>('');
  const [editTypeRoute, setEditTypeRoute] = useState<string>('');
  const [editNum_nivel, setEditNum_nivel] = useState<number>(0);
  const [editPresa, setEditPresa] = useState<string>('');

  const handleEdit = (item: Route) => {
    setEditingRoute(item);
    setEditQrRoute(item.qrRoute);
    setEditName(item.name);
    setEditTypeRoute(item.typeRoute);
    setEditNum_nivel(item.num_nivel);
    setEditPresa(item.presa);
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (editingRoute) {
      try {
        const updatedRoute = {
          qrRoute: editQrRoute,
          name: editName,
          typeRoute: editTypeRoute,
          num_nivel: editNum_nivel,
          presa: editPresa,
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.put(`${API_BASE_URL_LOCAL}/route/${editingRoute.idRoute}`, updatedRoute);
        const updatedRouteList = routeList.map(route =>
          route.idRoute === editingRoute.idRoute ? { ...route, ...updatedRoute } : route
        );
        setRouteList(updatedRouteList);
        setEditModalVisible(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

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

  const canDeleteRoute = async (idRoute: number): Promise<boolean> => {
    try {
      const response = await axios.get(`${API_BASE_URL_LOCAL}/route/${idRoute}/videos`);
      const videos = response.data;
      console.log(videos);
      return videos;
    } catch (error) {
      console.error('Error al verificar videos asociados a la ruta:', error);
      return false; // En caso de error, prevenir la eliminación por seguridad
    }
  };

  const handleDelete = async (routeId: number) => {
    const hasVideos = await canDeleteRoute(routeId);
    console.log('hasVideos: ', hasVideos);
    if (!hasVideos) {
      Alert.alert(
        'Confirmación',
        '¿Estás seguro que deseas eliminar esta ruta?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Eliminar',
            onPress: async () => {
              try {
                await axios.delete(`${API_BASE_URL_LOCAL}/route/${routeId}`);
                setRouteList(routeList.filter(route => route.idRoute !== routeId));
              } catch (error) {
                console.error('Error al eliminar la ruta:', error);
              }
            },
          },
        ]
      );
    } else {
      Alert.alert('No se puede eliminar la ruta porque tiene videos asociados.');
    }
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
      </View>
      <View>
        <FlatList
          data={routeList}
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
                <>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                  <Text style={styles.editButtonText}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} onPress={() => handleDelete(item.idRoute)}>
                  <Text style={styles.editButtonText}>🗑️</Text>
                </TouchableOpacity>
                </>
                )}
              </View>
          </>
          )}
        />

      </View>
    </View>

    <Modal
        animationType= "none"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Ruta</Text>

            <Text style={styles.label}>QR de la ruta</Text>
            <TextInput
              style={styles.input}
              placeholder="QR"
              value={editQrRoute}
              onChangeText={setEditQrRoute}
            />

            <Text style={styles.label}>Nombre de la ruta</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={editName}
              onChangeText={setEditName}
            />

            <Text style={styles.label}>Tipo de ruta</Text>
            <TextInput
              style={styles.input}
              placeholder="Tipo"
              value={editTypeRoute}
              onChangeText={setEditTypeRoute}
            />

            <Text style={styles.label}>Nivel de la ruta</Text>
            <TextInput
              style={styles.input}
              placeholder="Nivel"
              keyboardType="numeric"
              value={editNum_nivel.toString()}
              onChangeText={(text) => setEditNum_nivel(Number(text))}
            />

            <Text style={styles.label}>Color de las presas</Text>
            <TextInput
              style={styles.input}
              placeholder="Color"
              value={editPresa}
              onChangeText={setEditPresa}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButtonModal} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    <TouchableOpacity style={styles.cancelButton} onPress={() => handleBackButton()}>
      <Text style={styles.cancelButtonText}>VOLVER</Text>
    </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cancelButtonModal: {
    padding: 10,
    backgroundColor: '#F44336',
    borderRadius: 5,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)',
},
modalContent: {
  width: 300,
  padding: 20,
  backgroundColor: '#fff',
  borderRadius: 10,
},
modalTitle: {
  fontSize: 25,
  fontWeight: 'bold',
  marginBottom: 30,
  color: '#000000',
},
  editButton: {
    marginRight: 2,
    padding: 10,
    backgroundColor: '#FFEB3B',
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 1,

  },
  editButtonText: {
    fontSize: 18,
    backgroundColor: '#FFEB3B',
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
    backgroundColor: '#F44336',
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
      backgroundColor: '#42A5F5',
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
      backgroundColor: '#4CAF50',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Vias;

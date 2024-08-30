/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View, Alert, Modal, TextInput } from 'react-native';
import { RootStackParamList, Video, Route } from '../../interfaces/types';
import YoutubePlayer from 'react-native-youtube-iframe';

import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';

import { API_BASE_URL_PRO } from '../../../config/config';



type DetallesViaScreenRouteProp = RouteProp<RootStackParamList, 'DetallesVia'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'Boulders' | 'Vias'>;

/**
 * Expresión regular que permite reconocer tanto URLs de Shorts como de videos, ambos en la plataforma de YT.
 * @param url url que redirige al contenido de youtube.
 * @returns match[1] video estándar de YouTube si existe
 * @returns match[2] video short de YouTube si existe
 * @returns null si no identifica ninguna de las opciones anteriores
 */
const extractVideoId = (url: string) => {
    const match = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
    );
    return match ? (match[1] || match[2]) : null;
};

const DetallesVia = () => {

    const [playingVideo, setPlayingVideo] = useState<string  | number | null>(null);

    const route = useRoute<DetallesViaScreenRouteProp>();
    const { viaData, user } = route.params;
    const navigation = useNavigation<NavigationProp>();
    const data = viaData.videos || [];

    const [videoList, setVideoList] = useState<any[]>(data); // Estado para la lista de videos

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
            const response = await axios.put(`${API_BASE_URL_PRO}/route/${editingRoute.idRoute}`, updatedRoute);
            setEditModalVisible(false);
            handleHome();
          } catch (error) {
            console.error(error);
          }
        }
      };

    const isWorker = user && user.role === 'WORKER';
    const isUser = user && user.role === 'USER';


    const handleBouldersPress = async () => {
        console.log('User BouldersPress:', user);
        if(user !== null && user?.role !== 'WORKER'){ // Los que no tengan usuario (invitados) o sean WORKERS, no podran acceder a esta funcionalidad.
            try {
                const response = await axios.get(`${API_BASE_URL_PRO}/boulders`);
                const boulderData = response.data;
                navigation.navigate('Boulders', { boulderData, user });
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleRoutesPress = async () => {
        console.log('User RoutesPress:', user);
        if(user !== null){ // Los que no tengan usuario (invitados) no podran acceder a esta funcionalidad.
            try {
                const response = await axios.get(`${API_BASE_URL_PRO}/boulder/${viaData.boulder.idBoulder}/routes`);
                const routesData = response.data;
                navigation.navigate('Vias', { boulder: viaData.boulder, routesData, user });
            } catch (error) {
                console.error(error);
            }
        }
      };

      const handleBack = () => {
        if(user == null){
            navigation.navigate('Login');
        }else{
            handleRoutesPress();
        }
      };

    const renderVideo = (item: any) => {

        const videoId = extractVideoId(item.url);
        if(videoId){
            return(
                <YoutubePlayer
                    height={200}
                    play={playingVideo === item.url}
                    videoId={videoId}
                    onChangeState={(state) => state === 'ended' && setPlayingVideo(null)}
                    initialPlayerParams={{
                        rel: false, // Disable related videos
                    }}
                />
            );
        }
    };

    const handleNewVideo = async () => {
        try{
            if(user){
                const response = await axios.get(`${API_BASE_URL_PRO}/boulders`);
                const boulders = response.data;
                console.log(boulders);
                navigation.navigate('NewVideo', { user, boulders } );
            }
        }catch(error){
          console.error(error);
        }
      };

      const handleDelete = (item: Video) => {
        Alert.alert(
            'Confirmación',
            '¿Estás seguro que deseas eliminar este video?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', onPress: async () => {
                    // Aquí iría la lógica para eliminar el video
                    try{
                      const videoId = item.id;
                      console.log(item.id);

                      console.log(`${API_BASE_URL_PRO}/videos/${videoId}`);
                      await axios.delete(`${API_BASE_URL_PRO}/videos/${videoId}`);
                      console.log(item);
                      console.log('Video eliminado:', item.title);

                      setVideoList(prevVideos => prevVideos.filter(video => video.id !== videoId));

                    }catch(error){
                      console.error(error);
                    }
                },
            },
        ]);
      };

      const canDeleteRoute = async (idRoute: number): Promise<boolean> => {
        try {
            const response = await axios.get(`${API_BASE_URL_PRO}/route/${idRoute}/videos`);
            const videos = response.data;
            return videos;
        } catch (error) {
            console.error('Error al verificar videos asociados a la ruta:', error);
            return false; // En caso de error, prevenir la eliminación por seguridad
        }
    };

    const handleHome = async () => {
        if(user){
            navigation.navigate('Home', { user });
        }
      };

    const handleDeleteRoute = async () => {
        const hasVideos = await canDeleteRoute(viaData.idRoute);
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
                                await axios.delete(`${API_BASE_URL_PRO}/route/${viaData.idRoute}`);
                                handleHome();
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

    return (
        <>
        <View style={styles.headerContainer}>
        <View style={styles.headerBoulderData}>
            <TouchableOpacity style={styles.headerTextContainer} onPress={handleBouldersPress}>
                <Text style={styles.headerTitle}>{viaData.boulder.name}</Text>
                <Text style={styles.headerText}>{viaData.boulder.address}</Text>
                <Text style={styles.headerText}>{viaData.boulder.locality}</Text>
                <Text style={styles.headerText}>{viaData.boulder.mail}</Text>
                <Text style={styles.headerText}>{viaData.boulder.phone}</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.headerBoulderData}>
            <TouchableOpacity style={styles.headerTextContainer} onPress={handleRoutesPress}>
                <Text style={styles.infoTitle}>{viaData.name}</Text>
                <Text style={styles.infoText}>Tipo: {viaData.typeRoute}</Text>
                <Text style={styles.infoText}>Nivel: {viaData.num_nivel}</Text>
                <Text style={styles.infoText}>Presa: {viaData.presa}</Text>
                <Text style={styles.infoText}>Fecha de creación: {new Date(viaData.creationDate).toLocaleDateString()}</Text>
            </TouchableOpacity>
            {isWorker && (
            <>
            <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(viaData)}>
              <Text style={styles.editButtonText}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={handleDeleteRoute}>
                <Text style={styles.editButtonText}>🗑️</Text>
            </TouchableOpacity>
            </>
            )}
            {isUser && (
            <>
            <TouchableOpacity style={styles.editButton} onPress={handleNewVideo}>
              <Text style={styles.editButtonText}>➕</Text>
            </TouchableOpacity>
            </>
            )}
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
              placeholder="Duración"
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

        </View>
            <SafeAreaView style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.flatListContent}
                    data={videoList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                    <>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => setPlayingVideo(item.url)}>
                            {renderVideo(item)}
                        </TouchableOpacity>
                        <View style={styles.itemData}>
                            <Text style={styles.author}>Autor: {item.user.name}</Text>
                            <Text style={styles.time}>Duración: {item.duration} minutos</Text>
                            {isWorker && (
                            <TouchableOpacity style={styles.deleteButton}>
                                <Text style={styles.editButtonText} onPress={() => handleDelete(item)}>🗑️</Text>
                            </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    </>
                    )}
                />
                <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
                    <Text style={styles.cancelButtonText}>VOLVER</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
      },
    cancelButtonModal: {
      padding: 10,
      backgroundColor: '#f44336', // Color para el botón de cancelar
      borderRadius: 5,
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20, // Separación entre los campos y los botones
    },
    saveButton: {
      padding: 10,
      backgroundColor: '#4CAF50', // Color para el botón de guardar
      borderRadius: 5,
      flex: 1,
      marginRight: 10, // Separación entre los dos botones
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
    deleteButton: {
        width: 40,
        height: 40,
        marginRight: 2,
        backgroundColor: '#fbff00',
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemData: {
        marginBottom: 10,
    },
    headerContainer: {
        width: '100%',
        padding: 10,
        backgroundColor: '#17bd93',
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    headerBoulderData: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 8,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#d0f0b3',
        borderColor: '#000',
        borderWidth: 1,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerText: {
        fontSize: 14,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 14,
    },
    editButton: {
        marginRight: 2,
        padding: 10,
        backgroundColor: '#fbff00',
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
    },
    editButtonText: {
        fontSize: 18,
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
        backgroundColor: '#f8f8f8',
        //marginBottom: 50,
        // Para insertar botones de atras, etc
    },
    flatListContent: {
        marginTop: 120,
        paddingTop: 180,
        paddingBottom: 100,
    },
    itemContainer: {
        width: '100%',
        backgroundColor: '#c7eff0',
        padding: 15,
        marginVertical: 8,
        borderRadius: 5,
    },
    video: {
        width: '100%',
        height: 200,
    },
    author: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    time: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
        marginBottom: 2,
    },
});

export default DetallesVia;

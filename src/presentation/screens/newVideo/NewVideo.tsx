/* eslint-disable prettier/prettier */
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    Alert,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { NewVideoProp, RootStackParamList, Route } from '../../interfaces/types';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { API_BASE_URL_PRO } from '../../../config/config';

import background from '../../../assets/img/background.jpg';


type NewVideoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;


const NewVideo: React.FC = () => {

    const route = useRoute<NewVideoProp>();

    const { user, boulders } = route.params;
    console.log('Route params:', route.params);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [boulderName, setBoulderName] = useState('');
    const [routeName, setRouteName] = useState('');

    const [routes, setRoutes] = useState<Route[]>([]);

    // Crear un mapa para acceder al ID del rocódromo
    const boulderMap = new Map(boulders.map(boulder => [boulder.name, boulder.idBoulder]));


    const navigation = useNavigation<NewVideoScreenNavigationProp>();

    const handleBoulderChange = async (selectedBoulderName: string) => {
        setBoulderName(selectedBoulderName);
        setRouteName('');

        if(selectedBoulderName){
            const boulderId = boulderMap.get(selectedBoulderName);
            if(boulderId){
                try{
                    // Obtener las vías del rocódromo seleccionado
                    const response = await axios.get(`${API_BASE_URL_PRO}/boulder/${boulderId}/routes`);
                    setRoutes(response.data);
                }catch(error){
                    console.error(error);
                }
            }

        }else{
            setRoutes([]);
        }
    };

    const handleCreateVideo = async () => {

        const youtubeUrlPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/;

        if (!youtubeUrlPattern.test(url)) {
            Alert.alert('Error', 'La URL del video no es válida. Debe ser una URL de YouTube o YouTube Shorts.');
            return;
        }

        let formData = {
            title,
            description,
            url,
            boulderName,
            routeName,
        };

        try{
            const response = await axios.post(`${API_BASE_URL_PRO}/user/${user.idUser}/boulder/${boulderName}/via/${routeName}/video/add`, formData, { timeout: 4000 });

            console.log(response.data);
            if (response.status === 201) {
                Alert.alert('Éxito','El vídeo ha sido añadido.');
                navigation.navigate('Home', { user } );
            } else {
                console.warn('Error al crear el video');
            }

        }catch(error: any){
            console.log(error);
            if(axios.isAxiosError(error)){
                if(error.response){
                    if(error.response.status === 400){
                        Alert.alert('Error', 'Algunos campos no han sido rellenados. Por favor, complete el formulario.');
                    }else if(error.response.status === 409){
                        Alert.alert('Error', 'Ese video ya está en uso. Por favor, elige otro.');
                    }else if(error.response.status === 500){
                        Alert.alert('Error', 'Ocurrió un error en el servidor. Intenta nuevamente más tarde.');
                    }else{
                        Alert.alert('Error', 'Por favor, seleccione un rocódromo y una vía.');
                    }
                } else if (error.code === 'ERR_NETWORK') {
                    // Manejo de error de red
                    Alert.alert('Error de Red', 'Verifica tu conexión a Internet e inténtalo nuevamente.');
                } else {
                    // Otros errores
                    Alert.alert('Error', 'Ocurrió un error inesperado. Intenta de nuevo.');
                }
            } else {
                // Errores no relacionados con Axios
                Alert.alert('Error', 'Ocurrió un error inesperado. Intenta de nuevo.');
            }
        }
    };

    return (
        <ImageBackground source={background} style={styles.background}>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>AÑADIR NUEVO VIDEO</Text>
            </View>

            <View style={styles.container}>
            <Text style={styles.label}>Título del vídeo</Text>

            <TextInput
                style={styles.input}
                placeholder="Título del vídeo"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>Descripción del vídeo (Opcional)</Text>

            <TextInput
                style={styles.input}
                placeholder="Breve descripcion del video"
                value={description}
                onChangeText={setDescription}
            />

            <Text style={styles.label}>URL del vídeo</Text>

            <TextInput
                style={styles.input}
                placeholder="URL del video"
                value={url}
                onChangeText={setUrl}
            />

            <Text style={styles.label}>Nombre del rocódromo</Text>
            <View style={styles.input}>
                <Picker
                    style={styles.picker}
                    selectedValue={boulderName}
                    onValueChange={handleBoulderChange}
                >
                    <Picker.Item label="Seleccione rocódromo..." value="" enabled={false} />
                    {boulders.map((boulder) => (
                                    <Picker.Item key={boulder.idBoulder} label={boulder.name} value={boulder.name} />
                    ))}

                </Picker>
            </View>

            <Text style={styles.label}>Nombre de la vía</Text>
            <View style={styles.input}>
                <Picker
                    style={styles.picker}
                    selectedValue={routeName}
                    onValueChange={(itemValue) => setRouteName(itemValue)}
                    enabled={boulderName !== ''}
                >
                    <Picker.Item label="Seleccione vía..." value="" enabled={false} />
                    {routes.map((route) => (
                        <Picker.Item key={route.idRoute} label={route.name} value={route.name} />
                    ))}

                </Picker>
            </View>

            <TouchableOpacity style={styles.createButton} onPress={handleCreateVideo}>
                <Text style={styles.createButtonText}>CREAR VÍDEO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Home', { user })}>
                <Text style={styles.cancelButtonText}>CANCELAR</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    );

};

const styles = StyleSheet.create({
    background: {
        flex: 1,
      },
    container: {
      flex: 1,
      padding: 20,
    },
    titleContainer: {
        width: '100%',
        backgroundColor: '#42A5F5',
        padding: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
      fontSize: 24,
      color: '#000000',
      fontWeight: 'bold',
    },
    input: {
      height: 40,
      borderColor: '#000',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      justifyContent: 'center',
      backgroundColor: '#e2e2e2',
    },
    createButton: {
      marginTop: 80,
      backgroundColor: '#4CAF50',
      padding: 10,
      alignItems: 'center',
      marginBottom: 10,
    },
    createButtonText: {
      color: '#fff',
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
    picker: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        fontSize: 12,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
});

export default NewVideo;

/* eslint-disable prettier/prettier */
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { NewVideoProp, RootStackParamList, Route } from '../../interfaces/types';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { API_BASE_URL_LOCAL } from '../../../config/config';


type NewVideoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;


const NewVideo: React.FC = () => {

    const route = useRoute<NewVideoProp>();

    const { user, boulders } = route.params;
    console.log('Route params:', route.params);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [duration, setDuration] = useState('');
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
                    const response = await axios.get(`${API_BASE_URL_LOCAL}/boulder/${boulderId}/routes`);
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
        let formData = {
            title,
            description,
            url,
            duration,
            boulderName,
            routeName,
        };

        try{
            const response = await axios.post(`${API_BASE_URL_LOCAL}/user/${user.idUser}/boulder/${boulderName}/via/${routeName}/video/add`, formData);

            console.log(response.data);
            if (response.status === 201) {
                console.warn('Video creado exitosamente');
                navigation.navigate('Home', { user } );
            } else {
                console.warn('Error al crear el video');
            }

        }catch(error){
            console.log(error);
            console.warn('Error al crear el video');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>AÑADIR NUEVO VIDEO</Text>


            <Text style={styles.label}>Título del vídeo</Text>

            <TextInput
                style={styles.input}
                placeholder="Título del vídeo"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>Descripción del vídeo</Text>

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
            <Text style={styles.label}>Duración del vídeo</Text>
            <View style={styles.input}>
                <Picker
                    style={styles.picker}
                    selectedValue={duration}
                    onValueChange={(itemValue) => setDuration(itemValue)}
                >
                    <Picker.Item label="Seleccione duración..." value="" enabled={false} />
                    {[...Array(10).keys()].map((value) => (
                        <Picker.Item key={value + 1} label={`${value + 1} minutos`} value={`${value + 1}`} />
                    ))}
                </Picker>
            </View>

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
    );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: '#00CC00',
    },
    input: {
      height: 40,
      borderColor: '#000',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      justifyContent: 'center',
    },
    createButton: {
      backgroundColor: '#00CC00',
      padding: 10,
      alignItems: 'center',
      marginBottom: 10,
    },
    createButtonText: {
      color: '#fff',
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
    picker: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
});

export default NewVideo;

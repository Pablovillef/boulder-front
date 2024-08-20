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
import { NewVideoProp, RootStackParamList } from '../../interfaces/types';
import axios from 'axios';


type NewVideoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;


const NewVideo: React.FC = () => {

    const route = useRoute<NewVideoProp>();
    const { user } = route.params;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [duration, setDuration] = useState('');
    const [idRoute, setIdRoute] = useState('');

    const navigation = useNavigation<NewVideoScreenNavigationProp>();


    const handleCreateVideo = async () => {
        let formData = {
            title,
            description,
            url,
            duration,
            idRoute,
        };

        try{
            const response = await axios.post('http://192.168.7.174:8080/api/v1/boulder/via/video/add', formData);
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
            <TextInput
                style={styles.input}
                placeholder="Título del vídeo"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Breve descripcion del video"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="URL del video"
                value={url}
                onChangeText={setUrl}
            />
            <TextInput
                style={styles.input}
                placeholder="Duracion del video en minutos"
                value={duration}
                onChangeText={setDuration}
            />
            <TextInput
                style={styles.input}
                placeholder="idRoute Retocar este campo"
                value={idRoute}
                onChangeText={setIdRoute}
            />

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
    helpText: {
        fontSize: 12,
        color: '#777',
        marginBottom: 20,
    },
});

export default NewVideo;

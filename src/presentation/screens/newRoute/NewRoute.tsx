/* eslint-disable prettier/prettier */
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { NewRouteProp, RootStackParamList } from '../../interfaces/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';


type NewRouteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const NewRoute: React.FC = () => {

    const route = useRoute<NewRouteProp>();
    const { user } = route.params;

    const navigation = useNavigation<NewRouteScreenNavigationProp>();

    const [idBoulder] = useState(user.boulder.idBoulder);
    const [qrRoute, setQrRoute] = useState('');
    const [name, setName] = useState('');
    const [typeRoute, setTypeRoute] = useState('');
    const [num_nivel, setNumNivel] = useState('');
    const [presa, setPresa] = useState('');

    const handleCreateRoute = async () => {
        let formData = {
            idBoulder,
            qrRoute,
            name,
            typeRoute,
            num_nivel,
            presa,
        };

        try{
            const response = await axios.post('http://192.168.62.215:8080/api/v1/boulder/via/enrollment', formData);
            console.log(response.data);
            if (response.status === 201) {
                console.warn('Ruta creada exitosamente');
                navigation.navigate('Home', {user} );
            } else {
                console.warn('Error al crear la ruta');
            }

        }catch(error){
            console.log(error);
            console.warn('Error al crear la ruta');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>REGISTRO VIA</Text>
            <TextInput
                style={styles.input}
                placeholder="Texto QR"
                value={qrRoute}
                onChangeText={setQrRoute}
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre de la ruta"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo de ruta"
                value={typeRoute}
                onChangeText={setTypeRoute}
            />
            <TextInput
                style={styles.input}
                placeholder="Nivel de ruta"
                value={num_nivel}
                onChangeText={setNumNivel}
            />
            <TextInput
                style={styles.input}
                placeholder="Color de las presas"
                value={presa}
                onChangeText={setPresa}
            />
            <TouchableOpacity style={styles.createButton} onPress={handleCreateRoute}>
                <Text style={styles.createButtonText}>CREAR VIA</Text>
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
});

export default NewRoute;

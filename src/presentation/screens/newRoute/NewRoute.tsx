/* eslint-disable prettier/prettier */
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { NewRouteProp, RootStackParamList } from '../../interfaces/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

import { API_BASE_URL_LOCAL } from '../../../config/config';

import background from '../../../assets/img/background.jpg';



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

            const response = await axios.post(`${API_BASE_URL_LOCAL}/boulder/via/enrollment`, formData);

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

    const [focusedField, setFocusedField] = useState<string | null>(null);

    const renderHelpText = () => {
        switch (focusedField) {
            case 'qrRoute':
                return 'Formato obligatorio: <Nombre Rocodromo>/<Numero Via> Ejemplo: Treparriscos/1';
            case 'name':
                return 'Debe contener entre 3 y 20 caracteres.';
            case 'typeRoute':
                return 'Valores esperados: BOULDER o WALL_ROUTE';
            case 'num_nivel':
                return 'Debe ser un número entero del 1 al 10.';
            case 'presa':
                return 'Especifica el color principal de las presas.';
            default:
                return null;
        }
    };


    return (
        <ImageBackground source={background} style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.title}>REGISTRO VIA</Text>
            <TextInput
                style={styles.input}
                placeholder="Texto QR"
                value={qrRoute}
                onChangeText={setQrRoute}
                onFocus={() => setFocusedField('qrRoute')}
                onBlur={() => setFocusedField(null)}
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre de la ruta"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo de ruta"
                value={typeRoute}
                onChangeText={setTypeRoute}
                onFocus={() => setFocusedField('typeRoute')}
                onBlur={() => setFocusedField(null)}
            />
            <TextInput
                style={styles.input}
                placeholder="Nivel de ruta"
                value={num_nivel}
                onChangeText={setNumNivel}
                onFocus={() => setFocusedField('num_nivel')}
                onBlur={() => setFocusedField(null)}
            />
            <TextInput
                style={styles.input}
                placeholder="Color de las presas"
                value={presa}
                onChangeText={setPresa}
                onFocus={() => setFocusedField('presa')}
                onBlur={() => setFocusedField(null)}
            />

            {focusedField && (
                <Text style={styles.helpText}>
                    {renderHelpText()}
                </Text>
            )}

            <TouchableOpacity style={styles.createButton} onPress={handleCreateRoute}>
                <Text style={styles.createButtonText}>CREAR VIA</Text>
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
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: '#4CAF50',
    },
    input: {
      height: 40,
      borderColor: '#000',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    createButton: {
      marginTop: 200,
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
    helpText: {
        fontSize: 12,
        color: '#777',
        marginBottom: 20,
    },
});

export default NewRoute;

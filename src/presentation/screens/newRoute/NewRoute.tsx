/* eslint-disable prettier/prettier */
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

        const qrPattern = /^[^/]+\/\d+$/;
        if (!qrPattern.test(qrRoute)) {
            Alert.alert('Error', 'El texto del QR debe seguir el formato <Nombre Rocodromo>/<Numero Via>. Ejemplo: Treparriscos/1');
            return;
        }

        if (presa.trim() === '' || !isNaN(Number(presa))) {
            Alert.alert('Error', 'El color de las presas es incorrecto.');
            return;
        }

        const nivel = parseInt(num_nivel, 10);
        if (isNaN(nivel) || nivel < 1 || nivel > 10) {
            Alert.alert('Error', 'El nivel de la ruta debe ser un número entre 1 y 10.');
            return;
        }

        try{

            const response = await axios.post(`${API_BASE_URL_LOCAL}/boulder/via/enrollment`, formData, { timeout: 4000 });

            console.log(response.data);
            if (response.status === 201) {
                Alert.alert('Éxito','La ruta ha sido creada.');
                navigation.navigate('Home', { user } );
            } else {
                console.warn('Error al crear la ruta');
            }

        }catch(error: any){
            console.log(error);
            if(axios.isAxiosError(error)){
                if(error.response){
                    if(error.response.status === 400){
                        Alert.alert('Error', 'Algunos campos han sido rellenados incorrectamente. Por favor, revise los datos del formulario.');
                    }else if(error.response.status === 409){
                        Alert.alert('Error', 'El QR o el nombre de la ruta ya está en uso. Por favor, elige otro.');
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

    const [focusedField, setFocusedField] = useState<string | null>(null);

    const renderHelpText = () => {
        switch (focusedField) {
            case 'qrRoute':
                return '(*) Formato obligatorio: <Nombre Rocodromo>/<Numero Via> Ejemplo: Treparriscos/1';
            case 'name':
                return '(*) Debe contener entre 3 y 20 caracteres.';
            case 'typeRoute':
                return '(*) Valores esperados: BOULDER o WALL_ROUTE';
            case 'num_nivel':
                return '(*) Debe ser un número del 1 al 10.';
            case 'presa':
                return '(*) Especifica el color principal de las presas.';
            default:
                return null;
        }
    };


    return (
        <ImageBackground source={background} style={styles.background}>
        <View style={styles.header}>
            <Text style={styles.headerText}>REGISTRO VIA</Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.label}>Texto del QR</Text>
            <TextInput
                style={styles.input}
                placeholder="Texto QR"
                value={qrRoute}
                onChangeText={setQrRoute}
                onFocus={() => setFocusedField('qrRoute')}
                onBlur={() => setFocusedField(null)}
            />
            {focusedField === 'qrRoute' && (
                <Text style={styles.helpText}>{renderHelpText()}</Text>
            )}
            <Text style={styles.label}>Nombre de la ruta</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de la ruta"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
            />
            {focusedField === 'name' && (
                <Text style={styles.helpText}>{renderHelpText()}</Text>
            )}

            <Text style={styles.label}>Tipo de ruta: 'BOULDER' o 'WALL ROUTE'</Text>
            <TextInput
                style={styles.input}
                placeholder="Tipo de ruta"
                value={typeRoute}
                onChangeText={setTypeRoute}
                onFocus={() => setFocusedField('typeRoute')}
                onBlur={() => setFocusedField(null)}
            />
            {focusedField === 'typeRoute' && (
                <Text style={styles.helpText}>{renderHelpText()}</Text>
            )}

            <Text style={styles.label}>Nivel de la ruta (1 - 10)</Text>
            <TextInput
                style={styles.input}
                placeholder="Nivel de ruta"
                value={num_nivel}
                onChangeText={setNumNivel}
                onFocus={() => setFocusedField('num_nivel')}
                onBlur={() => setFocusedField(null)}
            />
            {focusedField === 'num_nivel' && (
                <Text style={styles.helpText}>{renderHelpText()}</Text>
            )}

            <Text style={styles.label}>Color de las presas</Text>
            <TextInput
                style={styles.input}
                placeholder="Color de las presas"
                value={presa}
                onChangeText={setPresa}
                onFocus={() => setFocusedField('presa')}
                onBlur={() => setFocusedField(null)}
            />
            {focusedField === 'presa' && (
                <Text style={styles.helpText}>{renderHelpText()}</Text>
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
    },
    title: {
      fontSize: 24,
      color: '#42A5F5',
    },
    input: {
      height: 40,
      borderColor: '#000',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      backgroundColor: '#e2e2e2',
    },
    createButton: {
      marginTop: 30,
      backgroundColor: '#4CAF50',
      padding: 10,
      alignItems: 'center',
      marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
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
        color: '#000000',
        marginBottom: 20,
        backgroundColor: '#42A5F5',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    header: {
        marginBottom: 20,
        width: '100%',
        backgroundColor: '#42A5F5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
});

export default NewRoute;

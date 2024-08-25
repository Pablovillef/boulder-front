/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../interfaces/types';
import { API_BASE_URL_LOCAL } from '../../../config/config';


type NewUserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const NewUser: React.FC = () => {
  const navigation = useNavigation<NewUserScreenNavigationProp>();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = async () => {
    let formData = {
        name,
        surname,
        email,
        password,
    };

    const apiURL = `${API_BASE_URL_LOCAL}/user/enrollment`;

    try{
        const response = await axios.post(apiURL, formData);
        console.log(response.data);
        console.warn(response.status);
        if (response.status === 201) { // Suponiendo que el código de respuesta 201 es para creación exitosa
            console.warn('Usuario creado exitosamente');
            navigation.navigate('Login'); // Navegar de vuelta a la pantalla de login
        } else {
            console.warn('Error al crear el usuario');
        }
    }catch(error){
        console.log(error);
        console.warn('Error al crear el usuario');
    }
  };

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const renderHelpText = () => {
    switch (focusedField) {
        case 'name':
            return 'Debe contener entre 3 y 20 caracteres.';
        case 'surname':
            return 'Debe contener entre 3 y 20 caracteres.';
        case 'password':
            return 'Debe contener mínimo 8 caracteres alfanuméricos.';
        default:
            return null;
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRO USUARIO</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        onFocus={() => setFocusedField('name')}
        onBlur={() => setFocusedField(null)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={surname}
        onChangeText={setSurname}
        onFocus={() => setFocusedField('surname')}
        onBlur={() => setFocusedField(null)}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electronico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        onFocus={() => setFocusedField('password')}
        onBlur={() => setFocusedField(null)}
      />

      {focusedField && (
        <Text style={styles.helpText}>
          {renderHelpText()}
        </Text>
      )}

      <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
        <Text style={styles.createButtonText}>CREAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Login')}>
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

export default NewUser;

/* eslint-disable prettier/prettier */
import React from 'react';
// import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScanQrScreenNavigationProp, ScanQrScreenRouteProp } from '../../interfaces/types';
import axios from 'axios';

import { API_BASE_URL_PRO } from '../../../config/config';

import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';

import background from '../../../assets/img/background.jpg';

const ScanQr = () => {

  const navigation = useNavigation<ScanQrScreenNavigationProp>();
  const route = useRoute<ScanQrScreenRouteProp>();
  const { user } = route.params;

  const handleQrReaded = async (e: any) => {

    // 1º Recuperar String del QR.
    const qrData = e.data;
    const [name, id] = qrData.split('/');

    // 2º Peticion http get, con los datos del QR.
    try{
      const response = await axios.get(`${API_BASE_URL_PRO}/boulder/${name}/route/${id}`);

      const viaData = response.data;

      // 3º Ir al componente DetalleVia, pasandole los datos obtenidos de la petición como parámetros.
      navigation.navigate('DetallesVia', { viaData, user });

    }catch(error){
      console.error('Error obteniendo los datos de la via:', error);
    }

  };

  const handleCancelButton = () => {

    if(user != null){
      navigation.navigate('Home', { user });
    }else{
      navigation.navigate('Login');
    }
  };

  return (
    <>
    <ImageBackground source={background} style={styles.background}>
    <QRCodeScanner
        onRead={handleQrReaded}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        showMarker={true}
        reactivate={true}
        reactivateTimeout={3000} //ms
    />

    <TouchableOpacity style={styles.cancelButton} onPress={handleCancelButton}>
      <Text style={styles.cancelButtonText}>CANCELAR</Text>
    </TouchableOpacity>
    </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
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
});


export default ScanQr;

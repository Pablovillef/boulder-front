/* eslint-disable prettier/prettier */
import React from 'react';
// import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { ScanQrScreenNavigationProp } from '../../interfaces/types';
import axios from 'axios';

const ScanQr = () => {

  const navigation = useNavigation<ScanQrScreenNavigationProp>();

  const handleQrReaded = async (e: any) => {

    // 1º Recuperar String del QR.
    const qrData = e.data;
    const [name, id] = qrData.split('/');

    // 2º Peticion http get, con los datos del QR.
    try{

      const response = await axios.get(`http://192.168.7.174:8080/api/v1/boulder/${name}/route/${id}`);
      const viaData = response.data;

      // 3º Ir al componente DetalleVia, pasandole los datos obtenidos de la petición como parámetros.
      navigation.navigate('DetallesVia', {viaData});

    }catch(error){
      console.error('Error obteniendo los datos de la via:', error);
    }

  };

  return (
    <QRCodeScanner
        onRead={handleQrReaded}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        showMarker={true}
        reactivate={true}
        reactivateTimeout={3000} //ms
    />
  );
};

export default ScanQr;

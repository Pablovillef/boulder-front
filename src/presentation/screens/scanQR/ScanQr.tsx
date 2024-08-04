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

      const response = await axios.get(`http://localhost:8080/api/v1/boulder/${name}/route/${id}`);
      const viaData = response.data;

      /*   viaData
      {
        "idRoute": 1,
        "qrRoute": "Treparriscos/1",
        "name": "Via 1",
        "typeRoute": "BOULDER",
        "num_nivel": 1,
        "presa": "Naranja",
        "creationDate": "2024-08-04T09:24:53.751+00:00",
        "boulder": {
         "name": "Treparriscos",
         "address": "C/Santa Lucia, 22",
         "locality": "Muriedas",
         "mail": "Treparriscos@gmail.com",
         "phone": "942 222 222"
        },
        "videos": [
        {
          "id": 1,
          "title": "MiVideo_1_Titulo",
          "description": "Escalando via 1",
          "url": "youtube.com"
        }
        ]
      }
      */

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

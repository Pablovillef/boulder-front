/* eslint-disable prettier/prettier */
import React from 'react';
// import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { ScanQrScreenNavigationProp } from '../../interfaces/types';

const ScanQr = () => {

  const navigation = useNavigation<ScanQrScreenNavigationProp>();

  const handleQrReaded = () => {
    navigation.navigate('DetallesVia');
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

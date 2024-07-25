/* eslint-disable prettier/prettier */
import React from 'react';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

const ScanQr = () => {
  return (
    <QRCodeScanner
        onRead={({}) => console.log('Lectura QR completada')}
        flashMode={RNCamera.Constants.FlashMode.torch}
      />
  );
};

export default ScanQr;

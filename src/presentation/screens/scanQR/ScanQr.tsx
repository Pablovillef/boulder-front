/* eslint-disable prettier/prettier */
import React from 'react';
import { Alert } from 'react-native';
//import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

const ScanQr = () => {
  return (
    <QRCodeScanner
        onRead={({data}) => Alert.alert(data)}
        //flashMode={RNCamera.Constants.FlashMode.torch}
        showMarker={true}
        reactivate={true}
        reactivateTimeout={3000} //ms
    />
  );
};

export default ScanQr;

/* eslint-disable prettier/prettier */

// Esto mockea el módulo react-native-permissions para que Jest no intente ejecutar el código nativo.
module.exports = {
    preset: 'react-native',
    moduleNameMapper: {
      '\\.(png|jpg|jpeg|gif|svg)$': './__mocks__/fileMock.js', // Mock de imágenes
      '\\.(css|less)$': 'identity-obj-proxy', // Mock de estilos (en caso de necesitarlo)
    },
    transformIgnorePatterns: [
      'node_modules/(?!(@react-native|react-native|react-native-qrcode-scanner|react-native-youtube-iframe)/)',  // No ignorar transformaciones de react-native
    ],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transformar archivos .js, .jsx, .ts, .tsx con babel-jest
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFiles: ['./__mocks__/react-native-permissions.js'],
  };

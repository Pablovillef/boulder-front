/* eslint-disable prettier/prettier */
module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
      'node_modules/(?!(@react-native|react-native|@react-navigation|react-native-qrcode-scanner)/)',
    ],
    setupFiles: ['./jest.setup.js'],
  };

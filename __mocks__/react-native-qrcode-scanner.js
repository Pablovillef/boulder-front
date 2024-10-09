/* eslint-disable prettier/prettier */
jest.mock('react-native-qrcode-scanner', () => {
    return jest.fn(() => null);
  });

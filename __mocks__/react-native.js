/* eslint-disable prettier/prettier */

const mockNativeModules = {
  PlatformConstants: {},
  DeviceInfo: {},
  SourceCode: {},
  ImageLoader: {},
  KeyboardObserver: {},
  I18nManager: {},
  StatusBarManager: {},
  AlertManager: {},
  DevSettings: {},
  Networking: {},
  PushNotificationManager: {},
  SettingsManager: {
    // Mockeamos el método `get`
    get: jest.fn(() => ({})),
  },
  // Añadir más módulos si es necesario
};

jest.mock('react-native', () => {
  const ActualReactNative = jest.requireActual('react-native');
  return {
    ...ActualReactNative,
    NativeModules: mockNativeModules,
    BackHandler: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      exitApp: jest.fn(),
    },
    VirtualizedList: {
      ...ActualReactNative.VirtualizedList,
      renderItem: jest.fn(),
    },
  };
});

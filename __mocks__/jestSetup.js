// /* eslint-disable prettier/prettier */
// // Mock de archivos (fileMock.js)
// module.exports = 'test-file-stub';

// // Mock de react-native-gesture-handler
// jest.mock('react-native-gesture-handler', () => {
//     return {
//       GestureHandlerRootView: jest.fn(({ children }) => children),
//       Swipeable: jest.fn(({ children }) => children),
//       // Mock any other methods you might use
//     };
//   });

// // Mock de react-native-permissions
// jest.mock('react-native-permissions', () => {
//   return {
//     check: jest.fn(() => Promise.resolve('granted')),
//     request: jest.fn(() => Promise.resolve('granted')),
//     openSettings: jest.fn(),
//     PERMISSIONS: {
//       IOS: {},
//       ANDROID: {},
//     },
//     RESULTS: {
//       GRANTED: 'granted',
//       DENIED: 'denied',
//       BLOCKED: 'blocked',
//       UNAVAILABLE: 'unavailable',
//     },
//   };
// });

// // Mock de react-native-qrcode-scanner
// jest.mock('react-native-qrcode-scanner', () => {
//   return jest.fn(() => null);
// });

// // Mock de react-native-youtube-iframe
// jest.mock('react-native-youtube-iframe', () => {
//   const YoutubePlayer = () => null;
//   return YoutubePlayer;
// });

// // Mock de react-native
// /* eslint-disable prettier/prettier */
// jest.mock('react-native', () => {
//   const ActualReactNative = jest.requireActual('react-native');
//   return {
//     ...ActualReactNative,
//     NativeModules: {
//       ...ActualReactNative.NativeModules,
//       SettingsManager: {
//         settings: {},
//         getSettings: jest.fn(() => ({})), // Mock the getSettings method
//       },
//       RNGestureHandlerModule: {
//         // Mock RNGestureHandlerModule if used in your app
//         State: {},
//         // Add other properties or methods if necessary
//       },
//     },
//     BackHandler: {
//       addEventListener: jest.fn(),
//       removeEventListener: jest.fn(),
//       exitApp: jest.fn(),
//     },
//     VirtualizedList: {
//       ...ActualReactNative.VirtualizedList,
//       renderItem: jest.fn(),
//     },
//     PushNotificationIOS: jest.fn(), // Mock para PushNotificationIOS
//     Clipboard: { // Mock para Clipboard
//       getString: jest.fn(),
//       setString: jest.fn(),
//     },
//     ProgressBarAndroid: jest.fn(), // Mock para ProgressBarAndroid
//   };
// });


// // Preserve the original console.warn function
// const originalConsoleWarn = console.warn;

// // Optionally silence specific warnings
// jest.spyOn(console, 'warn').mockImplementation((message) => {
//   if (message.includes('Warning:')) {
//     return; // Ignore warnings
//   }
//   originalConsoleWarn(message); // Log other messages using the original function
// });

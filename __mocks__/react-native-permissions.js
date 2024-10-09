/* eslint-disable prettier/prettier */
jest.mock('react-native-permissions', () => {
    return {
      check: jest.fn(() => Promise.resolve('granted')),
      request: jest.fn(() => Promise.resolve('granted')),
      openSettings: jest.fn(),
      PERMISSIONS: {
        IOS: {},
        ANDROID: {},
      },
      RESULTS: {
        GRANTED: 'granted',
        DENIED: 'denied',
        BLOCKED: 'blocked',
        UNAVAILABLE: 'unavailable',
      },
    };
  });

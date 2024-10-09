/* eslint-disable prettier/prettier */
jest.mock('react-native-gesture-handler', () => {
    return {
      GestureHandlerRootView: jest.fn(),
      Swipeable: jest.fn(),
    };
  });

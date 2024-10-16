/* eslint-disable prettier/prettier */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { BoulderApp } from './src/BoulderApp';
import { Text, TextInput } from 'react-native';

// Desactivar el escalado de fuente globalmente para todos los Text y TextInput
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;


AppRegistry.registerComponent(appName, () => BoulderApp);

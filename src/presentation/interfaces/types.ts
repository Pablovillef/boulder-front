/* eslint-disable prettier/prettier */
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

// Definimos el tipo de los parámetros de las rutas de navegación
export type RootStackParamList = {
  Login: undefined;
  Home: { user: UserHomeDTO };
  Boulders: { boulderData: Boulder[] };
  NewUser: undefined;
  ScanQr: undefined;
  DetallesVia: { viaData: any };
  Vias: { boulder: Boulder, routesData: Route[] };
};

// Tipos para las props de navegación
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type BouldersScreenRouteProp = RouteProp<RootStackParamList, 'Boulders'>;
export type ScanQrScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ScanQr'>;
export type ViasScreenRouteProp = RouteProp<RootStackParamList, 'Vias'>;
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;


// Definimos los tipos para los datos
export interface Video {
  title: string;
}

export interface Route {
  idRoute: number;
  qrRoute: string;
  name: string;
  typeRoute: string;
  num_nivel: number;
  presa: string;
  creationDate: string;
}

export interface Boulder {
  idBoulder: number;
  name: string;
  address: string;
  locality: string;
  mail: string;
  phone: string;
  phone2?: string | null;
}

export interface UserHomeDTO {
  idUser: number;
  name: string;
  surname: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'WORKER';
}

export interface HomeProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

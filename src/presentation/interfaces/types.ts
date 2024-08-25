/* eslint-disable prettier/prettier */
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

// Definimos el tipo de los parámetros de las rutas de navegación
export type RootStackParamList = {
  Login: undefined;
  Home: { user: UserHomeDTO };
  Boulders: { boulderData: Boulder[], user: UserHomeDTO };
  NewUser: undefined;
  NewRoute: { user: UserHomeDTO };
  NewVideo: { user: UserHomeDTO, boulders: Boulder[] };
  ScanQr: { user: UserHomeDTO | null }; // `user` puede ser UserHomeDTO o null
  DetallesVia: { viaData: any, user: UserHomeDTO | null};
  Vias: { boulder: Boulder, routesData: Route[], user: UserHomeDTO };
  Videos: { videos: any, user: UserHomeDTO };
};

// Tipos para las props de navegación
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type BouldersScreenRouteProp = RouteProp<RootStackParamList, 'Boulders'>;
export type ScanQrScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ScanQr'>;
export type ViasScreenRouteProp = RouteProp<RootStackParamList, 'Vias'>;
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type ScanQrScreenRouteProp = RouteProp<RootStackParamList, 'ScanQr'>;
export type NewRouteProp = RouteProp<RootStackParamList, 'NewRoute'>;
export type NewVideoProp = RouteProp<RootStackParamList, 'NewVideo'>;
export type VideosProp = RouteProp<RootStackParamList, 'Videos'>;
export type VideosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export type DetallesViaScreenRouteProp = RouteProp<RootStackParamList, 'DetallesVia'>;
export type NavigationProp = StackNavigationProp<RootStackParamList, 'Boulders' | 'Vias'>;



// Definimos los tipos para los datos
export interface Video {
  title: string;
  description?: string;
  url: string;
  duration: number;
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
  boulder: Boulder;
}

export interface HomeProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

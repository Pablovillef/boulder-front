/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../interfaces/types';
import YoutubePlayer from 'react-native-youtube-iframe';

import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { API_BASE_URL } from '../../../config/config';


type DetallesViaScreenRouteProp = RouteProp<RootStackParamList, 'DetallesVia'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'Boulders' | 'Vias'>;

const HeaderInfo = ({ viaData, handleBouldersPress, handleRoutesPress }: { viaData: any, handleBouldersPress: () => void, handleRoutesPress: () => void }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.headerBox} onPress={handleBouldersPress}>
                <Text style={styles.headerTitle}>{viaData.boulder.name}</Text>
                <Text style={styles.headerText}>{viaData.boulder.address}</Text>
                <Text style={styles.headerText}>{viaData.boulder.locality}</Text>
                <Text style={styles.headerText}>{viaData.boulder.mail}</Text>
                <Text style={styles.headerText}>{viaData.boulder.phone}</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.infoBox} onPress={handleRoutesPress}>
                <Text style={styles.infoTitle}>{viaData.name}</Text>
                <Text style={styles.infoText}>Tipo: {viaData.typeRoute}</Text>
                <Text style={styles.infoText}>Nivel: {viaData.num_nivel}</Text>
                <Text style={styles.infoText}>Presa: {viaData.presa}</Text>
                <Text style={styles.infoText}>Fecha de creación:{viaData.creationDate}</Text>
            </TouchableOpacity>
        </View>
    );
};

/**
 * Expresión regular que permite reconocer tanto URLs de Shorts como de videos, ambos en la plataforma de YT.
 * @param url url que redirige al contenido de youtube.
 * @returns match[1] video estándar de YouTube si existe
 * @returns match[2] video short de YouTube si existe
 * @returns null si no identifica ninguna de las opciones anteriores
 */
const extractVideoId = (url: string) => {
    const match = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
    );
    return match ? (match[1] || match[2]) : null;
};

const DetallesVia = () => {

    const [playingVideo, setPlayingVideo] = useState<string  | number | null>(null);

    const route = useRoute<DetallesViaScreenRouteProp>();
    const { viaData, user } = route.params;
    const navigation = useNavigation<NavigationProp>();
    const data = viaData.videos || [];

    const handleBouldersPress = async () => {
        console.log('User BouldersPress:', user);
        if(user !== null && user?.role !== 'WORKER'){ // Los que no tengan usuario (invitados) o sean WORKERS, no podran acceder a esta funcionalidad.
            try {
                const response = await axios.get(`${API_BASE_URL}/boulders`);
                const boulderData = response.data;
                navigation.navigate('Boulders', { boulderData });
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleRoutesPress = async () => {
        console.log('User RoutesPress:', user);
        if(user !== null){ // Los que no tengan usuario (invitados) no podran acceder a esta funcionalidad.
            try {
                const response = await axios.get(`${API_BASE_URL}/boulder/${viaData.boulder.idBoulder}/routes`);
                const routesData = response.data;
                navigation.navigate('Vias', { boulder: viaData.boulder, routesData, user });
            } catch (error) {
                console.error(error);
            }
        }
      };

    const renderVideo = (item: any) => {

        const videoId = extractVideoId(item.url);
        if(videoId){
            return(
                <YoutubePlayer
                    height={200}
                    play={playingVideo === item.url}
                    videoId={videoId}
                    onChangeState={(state) => state === 'ended' && setPlayingVideo(null)}
                    initialPlayerParams={{
                        rel: false, // Disable related videos
                    }}
                />
            );
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <HeaderInfo viaData={viaData} handleBouldersPress={handleBouldersPress} handleRoutesPress={handleRoutesPress} />
                <FlatList
                    contentContainerStyle={styles.flatListContent}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity onPress={() => setPlayingVideo(item.url)}>
                                {renderVideo(item)}
                            </TouchableOpacity>
                            <Text style={styles.author}>Autor: {item.user.name}</Text>
                            <Text style={styles.time}>Tiempo: {item.duration} minutos</Text>
                        </View>
                    )}
                />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        marginBottom: 50,
        // Para insertar botones de atras, etc
    },
    flatListContent: {
        marginTop: 90,
        paddingTop: 180,
        paddingBottom: 100,
    },
    headerContainer: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    headerBox: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        marginBottom: 10,
    },
    infoBox: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerText: {
        fontSize: 14,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 14,
    },
    itemContainer: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 5,
    },
    video: {
        width: '100%',
        height: 200,
    },
    author: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    time: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
    },
});

export default DetallesVia;

/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';
import { RootStackParamList } from '../../interfaces/types';


type DetallesViaScreenRouteProp = RouteProp<RootStackParamList, 'DetallesVia'>;

const HeaderInfo = ({ viaData }: { viaData: any }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerBox}>
                <Text style={styles.headerTitle}>{viaData.boulder.name}</Text>
                <Text style={styles.headerText}>{viaData.boulder.adress}</Text>
                <Text style={styles.headerText}>{viaData.boulder.locality}</Text>
                <Text style={styles.headerText}>{viaData.boulder.mail}</Text>
                <Text style={styles.headerText}>{viaData.boulder.phone}</Text>

            </View>
            <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>{viaData.name}</Text>
                <Text style={styles.infoText}>{viaData.typeRoute}</Text>
                <Text style={styles.infoText}>{viaData.num_nivel}</Text>
                <Text style={styles.infoText}>{viaData.presa}</Text>
                <Text style={styles.infoText}>{viaData.creationDate}</Text>
            </View>
        </View>
    );
};

const DetallesVia = () => {

    const [playingVideo, setPlayingVideo] = useState<number | null>(null);

    const route = useRoute<DetallesViaScreenRouteProp>();
    const { viaData } = route.params;

    const data = viaData.videos || [];

    return (
        <SafeAreaView style={styles.container}>
            <HeaderInfo viaData={viaData}/>
                <FlatList
                    contentContainerStyle={styles.flatListContent}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.itemContainer}>
                                <TouchableOpacity onPress={() => setPlayingVideo(item.id)}>
                                    <Video
                                        source={{uri: item.url}}
                                        style={styles.video}
                                        controls={true}
                                        paused={playingVideo !== item.id}
                                        resizeMode="contain"
                                        onEnd={() => setPlayingVideo(null)}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.author}>Autor: {item.author}</Text>
                                <Text style={styles.time}>Tiempo: {item.time} minutos</Text>
                            </View>
                        );
                    }}
                />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    flatListContent: {
        paddingTop: 180,
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

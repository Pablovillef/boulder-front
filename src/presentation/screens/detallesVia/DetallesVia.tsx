/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';

const HeaderInfo = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerBox}>
                <Text style={styles.headerTitle}>Rocódromos Fernando</Text>
                <Text style={styles.headerText}>Calle San Fernando S/N</Text>
                <Text style={styles.headerText}>Teléfono: 942 000 000</Text>
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Vía 2</Text>
                <Text style={styles.infoText}>Color: Azul</Text>
                <Text style={styles.infoText}>Dificultad: Principiante</Text>
                <Text style={styles.infoText}>Fecha de creación: 20/20/2020</Text>
            </View>
        </View>
    );
};

const DetallesVia = () => {
    const [playingVideo, setPlayingVideo] = useState<number | null>(null);

    const data = [
        {
            id: 1,
            name: 'https://www.w3schools.com/html/mov_bbb.mp4',
            author: 'Jhon Uno',
            time: '4',
        },
        {
            id: 2,
            name: 'https://www.w3schools.com/html/movie.mp4',
            author: 'Jhon Dos',
            time: '5',
        },
        {
            id: 3,
            name: 'https://www.w3schools.com/html/mov_bbb.mp4',
            author: 'Jhon Tres',
            time: '6',
        },
        {
            id: 4,
            name: 'https://www.w3schools.com/html/mov_bbb.mp4',
            author: 'Jhon Tres',
            time: '6',
        },
        {
            id: 5,
            name: 'https://www.w3schools.com/html/mov_bbb.mp4',
            author: 'Jhon Tres',
            time: '6',
        },
        {
            id: 6,
            name: 'https://www.w3schools.com/html/mov_bbb.mp4',
            author: 'Jhon Tres',
            time: '6',
        },
        {
            id: 7,
            name: 'https://www.w3schools.com/html/mov_bbb.mp4',
            author: 'Jhon Tres',
            time: '6',
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <HeaderInfo />
                <FlatList
                    contentContainerStyle={styles.flatListContent}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.itemContainer}>
                                <TouchableOpacity onPress={() => setPlayingVideo(item.id)}>
                                    <Video
                                        source={{uri: item.name}}
                                        style={styles.video}
                                        controls={true}
                                        paused={playingVideo !== item.id}
                                        resizeMode="cover"
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

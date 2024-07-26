/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, FlatList, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';


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
            <FlatList 
                data={data} 
                keyExtractor={(item) => item.id.toString() }
                renderItem={({item}) => {
                    return (
                        <ScrollView style={{marginTop: 40, marginBottom: 40}}>
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
                        </ScrollView>
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
        paddingHorizontal: 10,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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

/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Video, VideosProp, VideosScreenNavigationProp } from '../../interfaces/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';

const Videos: React.FC = () => {

    const route = useRoute<VideosProp>();
    const { user, videos } = route.params;
    const navigation = useNavigation<VideosScreenNavigationProp>();

    const [playingVideo, setPlayingVideo] = useState<string | null>(null);

    const extractVideoId = (url: string) => {
      const match = url.match(
          /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
      );
      return match ? (match[1] || match[2]) : null;
  };

    console.log(videos);

    const renderVideo = (item: Video) => {
        const videoId = extractVideoId(item.url);
        console.log('Video ID:', videoId);
        if (videoId) {
            return (
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
        return null;
    };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Mis videos</Text>
        </View>

        <View style={styles.headerUserData}>
            <Text style={styles.subtitle}>Usuario: {user.name + ' ' + user.surname}</Text>
            <Text style={styles.subtitle}>Correo electrónico: {user.email}</Text>
        </View>

        <FlatList
                contentContainerStyle={styles.flatListContent}
                data={videos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => setPlayingVideo(item.url)}>
                            {renderVideo(item)}
                        </TouchableOpacity>
                        <Text style={styles.author}>Descripción: {item.description || 'Sin descripción'}</Text>
                        <Text style={styles.time}>Duración: {item.duration} minutos</Text>
                    </View>
                )}
        />

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Home', { user })}>
                <Text style={styles.cancelButtonText}>VOLVER</Text>
        </TouchableOpacity>
    </SafeAreaView>

  ); // return
};

const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: '#FF6600',
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    width: '100%',
    backgroundColor: '#ccff00',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerUserData: {
    width: '100%',
    backgroundColor: '#17bd93',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#000',
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 100,
  },
  itemContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
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
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});
export default Videos;

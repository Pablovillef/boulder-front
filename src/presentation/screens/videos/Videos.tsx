/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Video, VideosProp, VideosScreenNavigationProp } from '../../interfaces/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from 'axios';
import { API_BASE_URL_LOCAL } from '../../../config/config';

const Videos: React.FC = () => {

    const route = useRoute<VideosProp>();
    const { user, videos } = route.params;
    const navigation = useNavigation<VideosScreenNavigationProp>();

    const [playingVideo, setPlayingVideo] = useState<string | null>(null);
    const [videoList, setVideoList] = useState<Video[]>(videos); // Estado para la lista de videos


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

    const handleDelete = (item: Video) => {
      Alert.alert(
          'Confirmación',
          '¿Estás seguro que deseas eliminar este video?',
          [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Eliminar', onPress: async () => {
                  // Aquí iría la lógica para eliminar el video
                  try{
                    const videoId = item.id;
                    console.log(item.id);

                    console.log(`${API_BASE_URL_LOCAL}/videos/${videoId}`);
                    await axios.delete(`${API_BASE_URL_LOCAL}/videos/${videoId}`);

                    console.log(item);
                    console.log('Video eliminado:', item.title);

                    setVideoList(prevVideos => prevVideos.filter(video => video.id !== videoId));

                  }catch(error){
                    console.error(error);
                  }
              }
          }
      ]);
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
                data={videoList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => setPlayingVideo(item.url)}>
                            {renderVideo(item)}
                        </TouchableOpacity>
                        <View style={styles.infoContainer}>
                          <Text style={styles.author}>Descripción: {item.description || 'Sin descripción'}</Text>
                          <Text style={styles.time}>Duración: {item.duration} minutos</Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                          <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editButtonText}>✏️</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.editButton} onPress={() => handleDelete(item)}>
                            <Text style={styles.editButtonText}>🗑️</Text>
                          </TouchableOpacity>
                        </View>
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
  editButton: {
    marginRight: 2,
    backgroundColor: '#fbff00',
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 1,
    width: 40,
    height: 40,
            alignItems: 'center',
        justifyContent: 'center',
},
editButtonText: {
    fontSize: 18,
    textAlign: 'center',
},
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
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  infoContainer: {
    marginBottom: 10,
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

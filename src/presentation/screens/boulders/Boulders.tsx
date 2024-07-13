/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import { BouldersScreenRouteProp } from '../../interfaces/types';

interface BouldersProps {
    route: BouldersScreenRouteProp;
}

const Boulders: React.FC<BouldersProps> = ({ route }) => {

  const {boulderData} = route.params;

  return (
    <View>
      <Text>Nombre: {boulderData.name}</Text>
      <Text>Address: {boulderData.address}</Text>
      <Text>Email: {boulderData.mail}</Text>
      <Text>Phone: {boulderData.phone}</Text>
      <Text>Nº Vias disponibles: {boulderData.routes.length}</Text>
      <FlatList
        data={boulderData.routes}
        renderItem={({item}) => (
          <View>
            <Text>Nombre: {item.name}</Text>
            <Text>Dificultad: {item.difficulty}</Text>
            <Text>Color: {item.color}</Text>
            <Text>Videos:</Text>
            {item.videos ? (
              item.videos.map((video, index) => (
                <Text key={index}>{video.title}</Text>
              ))
            ) : (
              <Text>No videos</Text>
            )}
          </View>
        )}
        keyExtractor={item => item.idRoute.toString()}
      />
    </View>
  );
};

export default Boulders;

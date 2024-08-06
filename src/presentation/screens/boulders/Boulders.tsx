/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { BouldersScreenRouteProp } from '../../interfaces/types';
import { useRoute } from '@react-navigation/native';

/*
      [
      {
      "idBoulder": 1,
      "name": "RascaMuros",
      "address": "C/Santa Lucia, 22",
      "locality": "Muriedas",
      "mail": "RascaMuros@gmail.com",
      "phone": "942 222 222",
      "phone2": null
      }
      ]
*/

const Boulders: React.FC = () => {

    const boulder = useRoute<BouldersScreenRouteProp>();
    const { boulderData } = boulder.params;

    return (
        <FlatList
            data={boulderData}
            keyExtractor={(item) => item.idBoulder.toString()}
            renderItem={({item}) => (
                <View style={styles.boulderContainer}>
                    <Text style={styles.boulderText}>Nombre: {item.name}</Text>
                    <Text style={styles.boulderText}>Dirección: {item.address}</Text>
                    <Text style={styles.boulderText}>Localidad: {item.locality}</Text>
                    <Text style={styles.boulderText}>Email: {item.mail}</Text>
                    <Text style={styles.boulderText}>Teléfono: {item.phone}</Text>

                    {item.phone2 && <Text style={styles.boulderText}>Teléfono 2: {item.phone2}</Text>}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    boulderContainer: {
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
      borderColor: '#ccc',
      borderWidth: 1,
    },
    boulderText: {
      fontSize: 16,
    },
  });

export default Boulders;

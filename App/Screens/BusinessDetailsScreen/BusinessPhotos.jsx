import { View, FlatList, Image, StyleSheet } from 'react-native';
import React from 'react';
import Heading from '../../Components/Heading';

export default function BusinessPhotos({ business }) {
  return (
    <View style={styles.container}>
      <Heading text={'Photos'} />
      <FlatList
        horizontal
        data={business?.images}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item?.url }}
              style={styles.image}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Adjust margin as needed
  },
  imageContainer: {
    marginRight: 10, // Adjust spacing between images
  },
  image: {
    width: 160,
    height: 120,
    borderRadius: 15,
  },
});

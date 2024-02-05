import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import GlobalApi from '../../Utils/GlobalApi';
import Heading from '../../Components/Heading';

export default function Slider() {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = () => {
    GlobalApi.getSlider().then(resp => {
      setSlider(resp?.sliders || []);
    });
  };

  return (
    <View>
      <Heading text={'Offers For You'}/>
      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false }
        renderItem={({ item, index }) => (
          <View style={{marginRight:20}}>
            <Image source={{ uri: item?.image?.url }} 
              style={styles.sliderImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontFamily: 'outfit-medium',
  },
  sliderImage:{
    width:260,
    height:140,
    objectFit:'contain'
  }
});

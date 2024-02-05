import React from 'react';
import { View, FlatList } from 'react-native';
import Header from './Header';
import Slider from './Slider';
import Categories from './Categories';
import BusinessList from './BusinessList';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FlatList
        contentContainerStyle={{ padding: 20 }}
        data={[{ key: 'slider' }, { key: 'categories' }, { key: 'businessList' }]}
        renderItem={({ item }) => {
          switch (item.key) {
            case 'slider':
              return <Slider />;
            case 'categories':
              return <Categories />;
            case 'businessList':
              return <BusinessList />;
            default:
              return null;
          }
        }}
        keyExtractor={item => item.key}
      />
    </View>
  );
}

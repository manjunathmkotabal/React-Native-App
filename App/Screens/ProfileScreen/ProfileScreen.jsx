import { View, Text, Image, FlatList, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { user } = useUser();
  const navigation = useNavigation();
  const { isLoaded,signOut } = useAuth();

  const signUserOut=()=>{
    if (!isLoaded) {
      return null;
    }
    signOut();
  }

  const handleMenuItemPress = (itemName) => {
    switch (itemName) {
      case 'Home':
        navigation.navigate('home');
        break;
      case 'My Booking':
        navigation.navigate('booking');
        break;
      case 'Contact Us':
        Linking.openURL('mailto:'+'somebody@gmail.com'+'?subject=I am looking for a Service&body= Hi There,')
        break;
      case 'Logout':
        signUserOut();
        break;
      default:
        break;
    }
  };

  const profileMenu = [
    {
      id: 1,
      name: 'Home',
      icon: 'home',
    },
    {
      id: 2,
      name: 'My Booking',
      icon: 'bookmark-sharp',
    },
    {
      id: 3,
      name: 'Contact Us',
      icon: 'mail',
    },
    {
      id: 4,
      name: 'Logout',
      icon: 'log-out',
    },
  ];

  return (
    <View>
      <View style={{ padding: 20, paddingTop: 30, backgroundColor: Colors.PRIMARY }}>
        <Text style={{ fontSize: 30, fontFamily: 'outfit-bold', color: Colors.WHITE }}>Profile</Text>
        <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
          <Image
            source={{ uri: user?.imageUrl }}
            style={{
              width: 90,
              height: 90,
              borderRadius: 99,
            }}
          />
          <Text style={{ fontFamily: 'outfit-medium', fontSize: 26, color: Colors.WHITE, marginTop: 8 }}>{user?.fullName}</Text>
          <Text style={{ fontFamily: 'outfit-medium', fontSize: 17, color: Colors.WHITE, marginTop: 8 }}>{user?.primaryEmailAddress.emailAddress}</Text>
        </View>
      </View>

      <View style={{ paddingTop: 100 }}>
        <FlatList
          data={profileMenu}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 40, alignItems: 'center', paddingHorizontal: 80 }}
              onPress={() => handleMenuItemPress(item.name)} // Pass the item name to the handler function
            >
              <Ionicons
                name={item.icon}
                size={35}
                color={Colors.PRIMARY}
              />
              <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

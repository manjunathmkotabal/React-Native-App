import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function PageHeading({title}) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity 
            style={styles.backButtonContainer}
            onPress={()=>navigation.goBack()}
        >
            <Ionicons name="arrow-back-outline" size={30} color={Colors.BLACK} />
            <Text style={{fontSize:25, fontFamily:'outfit-medium'}}>{title}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    backButtonContainer:{
        display:'flex',
        flexDirection:'row',
        position:'absolute',
        zIndex:10,
        paddingTop:20,
        paddingLeft:20,
        gap:5,

    },
})
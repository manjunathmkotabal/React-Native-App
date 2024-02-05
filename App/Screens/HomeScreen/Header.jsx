import { View, StyleSheet, Image, Text, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

export default function Header() {
  const {user, isLoading} = useUser();
  return user && (
    <View style={styles.container}>
        {/* Profile section */}
      <View style={styles.profileMainContainer}>
        <View style={styles.profileContainer}>
            <Image
                source={{uri:user?.imageUrl}}
                style={styles.userImage}
            />
            <View>
                <Text style={{color:Colors.WHITE, fontFamily:'outfit-medium'}}>Welcome,</Text>
                <Text style={{color:Colors.WHITE, fontSize:20, fontFamily:'outfit-medium'}}>
                    {user?.fullName}
                </Text>
            </View>
        </View>
        <FontAwesome name="bookmark-o" size={28} color={Colors.WHITE} />
      </View>
      {/* Search bar section */}
        <View style={styles.searchBarContainer}>
            <TextInput placeholder='search'
                style={styles.textInput}
            />
            <FontAwesome name="search"
                style={styles.searchButton}
                size={24} color={Colors.PRIMARY} 
            />
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        padding:20,
        paddingTop:40,
        backgroundColor:Colors.PRIMARY,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25
    },
    profileMainContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:15,
        justifyContent:'space-between',
    },
    profileContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:15
    },
    userImage:{
        width:45,
        height:45,
        borderRadius:99
    },
    textInput:{
        padding:7,
        paddingHorizontal:16,
        backgroundColor:Colors.WHITE,
        borderRadius:8,
        width:'85%',
        fontSize:16,
        fontFamily:'outfit-medium'
    },
    searchBarContainer:{
        marginTop:15,
        display:'flex',
        flexDirection:'row',
        gap:10
    },
    searchButton:{
        backgroundColor:Colors.WHITE,
        borderRadius:8,
        padding:10
    }
})
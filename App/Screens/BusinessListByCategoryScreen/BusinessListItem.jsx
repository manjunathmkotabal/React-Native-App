import { View, Text, Image,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native';

export default function BusinessListItem({business, booking}) {

    const navigation = useNavigation();
  return (
    <TouchableOpacity 
        style={styles.container}
        onPress={()=>navigation.push('business-details', 
        {business:business}
        )}
    >
      <Image
        source={{uri:business?.images[0]?.url}}
        style={styles.image}
      />
      <View style={styles.subContainer}>
        <Text style={{fontFamily:'outfit', color:Colors.GRAY, fontSize:15}}>{business.contactPerson}</Text>
        <Text style={{fontFamily:'outfit-bold', fontSize:19}}>{business.name}</Text>
        
        {booking?.bookingStatus?
            <Text style={{
                marginTop:2,
                fontSize:12,
                fontFamily:'outfit',
                padding:2,
                color:Colors.PRIMARY,
                backgroundColor:Colors.PRIMARY_LIGHT,
                borderRadius:3,
                alignSelf:'flex-start',
                paddingHorizontal:7
                }}
            >
                {booking.bookingStatus}
            </Text> 
            :
            <Text style={{fontFamily:'outfit', fontSize:16, color:Colors.GRAY, maxWidth: '80%'}} numberOfLines={2}>
                <FontAwesome6 name="location-dot" size={20} color={Colors.PRIMARY}/>
                {business.adress}
            </Text>

        }

        {booking?.id ?
            <Text
                style={{fontFamily: 'outfit', color: Colors.PRIMARY}}
            >
                {new Date(booking.date).toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                })} at {booking.time}
            </Text>
            : null
        }

        
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:Colors.WHITE,
        borderRadius:15,
        marginBottom:15,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center'
    },
    subContainer:{
        display:'flex',
        gap:5,
    },
    image:{
        width:100,
        height:100,
        borderRadius:15,
    }
})
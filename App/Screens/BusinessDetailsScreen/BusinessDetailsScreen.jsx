import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons,FontAwesome6 } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

import BusinessPhotos from './BusinessPhotos';
import BusinessAboutMe from './BusinessAboutMe';
import BookingModal from './BookingModal';

export default function BusinessDetailsScreen() {
    const param = useRoute().params;

    const [business, setBusiness]=useState();
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();
    useEffect(()=>{
        setBusiness(param.business)
    },[param])

    const onMessageClick=()=>{
        Linking.openURL('mailto:'+business?.email+'?subject=I am looking for a Service&body= Hi There,')
    }
  return (
    <View>
        <ScrollView style={{height:'91%'}}>
            <TouchableOpacity 
                style={styles.backButtonContainer}
                onPress={()=>navigation.goBack()}
            >
                <Ionicons name="arrow-back-outline" size={30} color={Colors.WHITE} />
                <Text style={{fontSize:25, fontFamily:'outfit-medium'}}>{param.category}</Text>
            </TouchableOpacity>
            <Image
                source={{uri:business?.images[0]?.url}}
                style={{width:'100%', height:300}}
            />

            <View style={styles.infoContainer}>
                <Text style={{fontFamily:'outfit-bold', fontSize:25}}>{business?.name}</Text>
                <View style={styles.subContainer}>
                <Text style={{fontFamily:'outfit-medium', color:Colors.PRIMARY, fontSize:20}}>{business?.contactPerson} ✨</Text>
                <Text style={{
                    color:Colors.PRIMARY,
                    backgroundColor:Colors.PRIMARY_LIGHT,
                    padding:5,
                    borderRadius:5,
                    fontSize:13,
                }}>{business?.category?.name}</Text>
                </View>
                <Text style={{fontFamily:'outfit', fontSize:17, color:Colors.GRAY, alignItems:'center'}}>
                <FontAwesome6 name="location-dot" size={20} color={Colors.PRIMARY}/>
                    {business?.adress}
                </Text>

                {/* Hosizontal line */}
                <View style={{borderWidth:0.4, borderColor:Colors.GRAY, marginTop:20, marginBottom:20}}>
                </View>

                {/* About me section  */}
                <BusinessAboutMe business={business}/>

                {/* Hosizontal line */}
                <View style={{borderWidth:0.4, borderColor:Colors.GRAY, marginTop:20, marginBottom:20}}>
                </View>

                {/* Business Photos */}
                <BusinessPhotos business={business}/>
            </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
            <TouchableOpacity 
                style={styles.messageButton}
                onPress={()=>onMessageClick()}
            >
                <Text style={{textAlign:'center', fontFamily:'outfit-medium', color:Colors.PRIMARY, fontSize:18}}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.bookingButton}
                onPress={()=>{
                    setShowModal(true)
                }}
            >
                <Text style={{textAlign:'center', fontFamily:'outfit-medium', color:Colors.WHITE, fontSize:18}}>Book Now</Text>
            </TouchableOpacity>
        </View>
        {/* Booking Screen Modal */}
        <Modal
            animationType='slide'
            visible = {showModal}
        >
            <BookingModal 
                hideModal={()=>{setShowModal(false)}}
                businessId={business?.id}
            />
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    backButtonContainer:{
        position:'absolute',
        zIndex:10,
        padding:20,
    },
    infoContainer:{
        padding:20, 
        display:'flex',
        gap:7,
    },
    subContainer:{
        display:'flex',
        flexDirection:'row',
        gap:5,
        alignItems:'center',
    },
    buttonContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        margin:8,
        gap:8
    },
    messageButton:{
        padding:14,
        backgroundColor:Colors.WHITE,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        flex:1
    },
    bookingButton:{
        padding:14,
        backgroundColor:Colors.PRIMARY,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        flex:1
    },
})
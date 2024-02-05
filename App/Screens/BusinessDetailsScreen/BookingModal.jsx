import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';

export default function BookingModal({businessId,hideModal}) {
    const [timeList, setTimeList] = useState([]);
    const [selectedTime, setSelectedTime] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [note, setNote] = useState();
    const {user}=useUser();
    useEffect(()=>{
        getTime();
    },[])
    const getTime=()=>{
        const timeList=[]
        for(let i=8 ;i<=12;i++){
            timeList.push({
                time:i+':00 AM'
            })
            timeList.push({
                time:i+':30 AM'
            })
        }
        for(let i=1 ;i<=7;i++){
            timeList.push({
                time:i+':00 PM'
            })
            timeList.push({
                time:i+':30 PM'
            })
        }
        setTimeList(timeList);
    }

    // Create Booking method
    const createNewBooking=()=>{
        if(!selectedDate || !selectedTime){
            ToastAndroid.show('Please Select Data and Time', ToastAndroid.LONG);
            return;
        }
        const data={
            userName:user?.fullName,
            userEmail:user?.primaryEmailAddress.emailAddress,
            time:selectedTime,
            date:selectedDate,
            businessId:businessId
        }
        GlobalApi.createBooking(data).then(resp=>{
            ToastAndroid.show('Booking Created Successfully', ToastAndroid.LONG);
            hideModal();
        })
    }

  return (
    <ScrollView>
        <KeyboardAvoidingView style={{padding:20}}>
            <TouchableOpacity 
                    style={styles.backButtonContainer}
                    onPress={()=>{hideModal()}}
                >
                    <Ionicons name="arrow-back-outline" size={30} color={Colors.BLACK} />
                    <Text style={{fontSize:25, fontFamily:'outfit-medium'}}>Booking</Text>
            </TouchableOpacity>

            {/* calendar section */}
            <View style={styles.calendar}>
                <Heading text={'SelectDate'}/>
                <CalendarPicker 
                    onDateChange={setSelectedDate}
                    width={340}
                    minDate={Date.now()}
                    todayBackgroundColor={Colors.PRIMARY}
                    selectedDayTextColor={Colors.WHITE}
                    selectedDayStyle={{backgroundColor:Colors.BLACK, color:Colors.WHITE}}
                />
            </View>

            {/* Time select section */}
            <View style={{marginTop:20}}>
                <Heading text={'Select Time Slot'}/>
                <FlatList
                    data={timeList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index})=>(
                        <TouchableOpacity 
                            style={{marginRight:10}}
                            onPress={()=>setSelectedTime(item.time)}
                        >
                            <Text style={[selectedTime==item.time?styles.selectedTime:styles.unSelectedTime]}>{item.time}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Note section */}
            <View style={{marginTop:20}}>
                <Heading text={'Any Suggestions/Notes'}/>
                <TextInput 
                    placeholder='Note' 
                    style={styles.noteTextArea}
                    numberOfLines={4}
                    multiline={true}
                    onChange={(note)=>setNote(note)}
                />
            </View>

            {/* conformation button */}

            <TouchableOpacity 
                style={{marginTop:15}}
                onPress={()=>createNewBooking()}
            >
                <Text style={styles.confirmButton}>Conform & Book</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    </ScrollView>
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
    calendar:{
        padding:20,
        paddingTop:40,
        borderRadius:15,
    },
    selectedTime:{
        padding:10,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        paddingHorizontal:18,
        color:Colors.WHITE,
        backgroundColor:Colors.PRIMARY
    },
    unSelectedTime:{
        padding:10,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        paddingHorizontal:18,
        color:Colors.PRIMARY
    },
    noteTextArea:{
        borderWidth:1,
        borderRadius:15,
        textAlignVertical:'top',
        padding:20,
        fontSize:15,
        fontFamily:'outfit',
        borderColor:Colors.PRIMARY
    },
    confirmButton:{
        textAlign:'center',
        fontFamily:'outfit-medium',
        fontSize:17,
        color:Colors.WHITE,
        backgroundColor:Colors.PRIMARY,
        padding:6,
        borderRadius:99,
        elevation:2,
    },
})
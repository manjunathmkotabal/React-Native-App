import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeading from '../../Components/PageHeading'
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import BusinessListItem from '../BusinessListByCategoryScreen/BusinessListItem';

export default function BookingScreen() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]=useState(false);
  const {user} = useUser();
  useEffect(()=>{
    user && getUserBookings();
  },[user])

  const getUserBookings=()=>{
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then(resp=>{
      setBookings(resp.bookings);
      setLoading(false);
    })
  }
  return (
    <View>
      <PageHeading title={'Home'}/>

      <View style={{padding:20 ,paddingTop:60}}>
        <FlatList
          data={bookings}
          onRefresh={()=>getUserBookings()}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListItem 
              business={item.businessList}
              booking={item}
            />
          )}
        />
      </View>
    </View>
  )
}
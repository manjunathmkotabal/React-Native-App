import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,Image } from 'react-native'
import GlobalApi from '../../Utils/GlobalApi';
import Heading from '../../Components/Heading';
import BusinessListItemSmall from './BusinessListItemSmall';

export default function BusinessList() {

    const [businessLists, setBusinessLists]=useState([]);
    useEffect(()=>{
        getBusinessLists();
    },[])
    const getBusinessLists=()=>{
        GlobalApi.getBusinessLists().then(resp=>{
            setBusinessLists(resp?.businessLists ||[])
        })
    }
  return (
    <View style={{marginTop:15}}>
      <Heading text={'Latest Businesses'} isViewAll={true}/>
      <FlatList
        data={businessLists}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{marginRight:10}}>
            <BusinessListItemSmall business={item}/>
          </View>
        )}
      />
    </View>
  )
}
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen';
import BookingScreen from '../Screens/BookingScreeen/BookingScreen';


const Stack = createStackNavigator();
export default function BookingNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name='booking' component={BookingScreen}/>
        <Stack.Screen name='business-details' component={BusinessDetailsScreen}/>
    </Stack.Navigator>
  )
}
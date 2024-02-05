import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import BookingScreen from '../Screens/BookingScreeen/BookingScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import Colors from '../Utils/Colors';
import HomeNavigation from './HomeNavigation';
import BookingNavigation from './BookingNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
            headerShown:false,
            tabBarActiveTintColor:Colors.PRIMARY
        }}>
        <Tab.Screen name='home-navigation' component={HomeNavigation}
            options={{
                tabBarLabel:({color})=>(
                    <Text style={{color:color, fontSize:12, fontFamily:'outfit', marginTop:-7, marginBottom:3}}>Home</Text>
                ),
                tabBarIcon:({color, size})=>(
                    <FontAwesome name="home" size={size} color={color} />
                )
            }}
        />
        <Tab.Screen name='booking-navigation' component={BookingNavigation}
            options={{
                tabBarLabel:({color})=>(
                    <Text style={{color:color, fontSize:12, fontFamily:'outfit', marginTop:-7, marginBottom:3}}>Bookings</Text>
                ),
                tabBarIcon:({color, size})=>(
                    <FontAwesome name="bookmark" size={size} color={color} />
                )
            }}
        />
        <Tab.Screen name='profile' component={ProfileScreen}
            options={{
                tabBarLabel:({color})=>(
                    <Text style={{color:color, fontSize:12, fontFamily:'outfit', marginTop:-7, marginBottom:3}}>Profile</Text>
                ),
                tabBarIcon:({color, size})=>(
                    <FontAwesome name="user-circle-o" size={size} color={color} />
                )
            }}
        />
    </Tab.Navigator>
  )
}
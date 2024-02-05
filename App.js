import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useFonts } from 'expo-font';
import Login from './App/Screens/LoginScreen/Login';
import * as SecureStore from "expo-secure-store";
import TabNavigation from './App/Navigation/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { CLERK_API_KEY } from './App/Utils/Constants';
 
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  return (
    <ClerkProvider 
      publishableKey={CLERK_API_KEY}
      tokenCache={tokenCache}
    >
      <View style={styles.container}>
        {/* Signed In component */}
        <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SignedIn>

        {/* Signed out component */}
        <SignedOut>
          <Login/>
        </SignedOut>

        <StatusBar style="auto" />
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:30
  },
});

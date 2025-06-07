import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavBar from './Components/NavBar.jsx';
import CooksScreen from './Components/CooksScreen.jsx';
import CookDetails from './Components/CookDetails.jsx';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* Stack Navigator */}
        <View style={styles.stackContainer}>
          <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Cooks" component={CooksScreen} />
            <Stack.Screen name="CookDetails" component={CookDetails} />
          </Stack.Navigator>
        </View>

        {/* NavBar fijo abajo */}
        <NavBar />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stackContainer: {
    backgroundColor: '#008AE1',
    flex: 1,
    paddingBottom: 50,
    paddingTop: 30, 
  },
});

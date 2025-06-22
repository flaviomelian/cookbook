import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './Context/AuthContext.jsx';
import NavBar from './Components/NavBar.jsx';
import Home from './Components/Home.jsx';
import Feed from './Components/Feed.jsx';
import MainMenu from './Components/MainMenu.jsx';
import CooksScreen from './Components/CooksScreen.jsx';
import CookDetails from './Components/CookDetails.jsx';
import AddUpdateCook from './Components/AddUpdateCook.jsx';
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';
import Profile from './Components/Profile.jsx';
import UpdateUser from './Components/UpdateUser.jsx';
import FavouriteCooks from './Components/FavouriteCooks.jsx';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { token, loading } = useAuth();
  const [showHome, setShowHome] = useState(null);

  useEffect(() => {
    const checkFirstTime = async () => {
      const alreadyShown = await AsyncStorage.getItem('alreadyShownHome');
      setShowHome(alreadyShown ? false : true);
    };
    if (!token) checkFirstTime();
    else setShowHome(false);
  }, [token]);

  // Mientras carga el token o showHome, muestra pantalla de carga
  if (loading || showHome === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.stackContainer}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {token ? (
            // Pantallas autenticadas
            <>
              <Stack.Screen name="Main" component={MainMenu} />
              <Stack.Screen name="Feed" component={Feed} />
              <Stack.Screen name="Cooks" component={CooksScreen} />
              <Stack.Screen name="FavouriteCooks" component={FavouriteCooks} />
              <Stack.Screen name="CookDetails" component={CookDetails} />
              <Stack.Screen name="AddUpdateCook" component={AddUpdateCook} />
              <Stack.Screen name="UpdateUser" component={UpdateUser} />
              <Stack.Screen name="Profile" component={Profile} />
            </>
          ) : showHome ? (
            // Primera vez: muestra Home
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Cooks" component={CooksScreen} />
            </>
          ) : (
            // Siguientes veces: directo a Login
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      </View>
      {token && <NavBar />}
    </View>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
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

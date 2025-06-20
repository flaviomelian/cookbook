import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './Context/AuthContext';
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
import { useAuth } from './Context/AuthContext.jsx';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <RootNavigator />
        </View>
      </NavigationContainer>
    </AuthProvider>
  );
}

import AsyncStorage from '@react-native-async-storage/async-storage';
// ...existing code...

const RootNavigator = () => {
  const { token, loading } = useAuth();
  const [showHome, setShowHome] = useState(null);

  useEffect(() => {
    const checkFirstTime = async () => {
      const alreadyShown = await AsyncStorage.getItem('alreadyShownHome');
      if (alreadyShown) setShowHome(false);
      else setShowHome(true);
    };
    if (!token) checkFirstTime();
    else setShowHome(false);
    console.log('Token:', token);
    console.log('Show Home:', showHome);
  }, [token]);

  if (loading || showHome === null) return null;

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
              <Stack.Screen name="CookDetails" component={CookDetails} />
              <Stack.Screen name="AddUpdateCook" component={AddUpdateCook} />
              <Stack.Screen name="UpdateUser" component={UpdateUser} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Login" component={Login} />
            </>
          ) : showHome ? (
            // Primera vez: muestra Home
            <>
              <Stack.Screen name="Home">
                {props => (
                  <Home
                    {...props}
                    onContinue={async () => {
                      await AsyncStorage.setItem('alreadyShownHome', 'true');
                      setShowHome(false);
                    }}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          ) : (
            // Siguientes veces: directo a Login
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Home" component={Home} />
            </>
          )}
        </Stack.Navigator>
      </View>
      {token && <NavBar />}
    </View>
  );
};

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

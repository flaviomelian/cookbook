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
import { useAuth } from './Context/AuthContext.jsx';

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

const RootNavigator = () => {
  const { token } = useAuth(); // 👈 Aquí vemos si el usuario está autenticado
  const { loading } = useAuth();
  if (loading) return null;
  return (
    <View style={styles.container}>
      <View style={styles.stackContainer}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {token ? (
            // Pantallas para usuarios autenticados
            <>
              <Stack.Screen name="Main" component={MainMenu} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Feed" component={Feed} />
              <Stack.Screen name="Cooks" component={CooksScreen} />
              <Stack.Screen name="CookDetails" component={CookDetails} />
              <Stack.Screen name="AddUpdateCook" component={AddUpdateCook} />
              <Stack.Screen name="Profile" component={Profile} />
            </>
          ) : (
            // Pantallas públicas
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      </View>

      {/* NavBar fijo solo si está logueado */}
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

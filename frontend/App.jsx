import NavBar from './Components/NavBar.jsx';
import Books from './Components/Cooks.jsx';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Books/>
        <NavBar/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: '#0070C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

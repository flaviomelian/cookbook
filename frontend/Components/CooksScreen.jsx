import { View, StyleSheet } from 'react-native';
import Cooks from './Cooks.jsx'; // Assuming Cooks.jsx is the component that displays the Cooks

const CooksScreen = ({route}) => {
  const id = route?.params?.id;
  console.log(id, "lolko")
  return (
    <View style={styles.container}>
      <Cooks userId={id}/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: '#008AE1',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
});

export default CooksScreen;
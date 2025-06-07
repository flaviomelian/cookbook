import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import home from '../assets/home.png';
import account from '../assets/account.png';
import menubook from '../assets/menu_book.png';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.touchable}>
        <Image style={styles.link} source={home}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('Cooks')}>
        <Image style={styles.link} source={menubook}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable}>
        <Image style={styles.link} source={account}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#003f8e',
    width: '100%',
  },
  link: {
    fontSize: 26,
  },
  touchable: {
    backgroundColor: '#000f5f',
    borderRadius: 10,
    padding: 5,
  },
});

export default NavBar;

import { useState } from 'react'
import { View, Pressable, StyleSheet, Image } from 'react-native';
import home from '../assets/home.png';
import account from '../assets/account.png';
import menubook from '../assets/menu_book.png';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {

  const navigation = useNavigation();
  const [activeButton1, setActiveButton1] = useState(false);
  const [activeButton2, setActiveButton2] = useState(false);
  const [activeButton3, setActiveButton3] = useState(false);

  return (
    <View style={styles.navbar}>
      <Pressable style={() => [
        styles.touchable,
        activeButton1 && styles.buttonPressed
      ]} onPress={() => { 
        setActiveButton1(true)
        setActiveButton2(false)
        setActiveButton3(false)
        navigation.navigate('Main')
        }}>
        <Image style={styles.link} source={home} />
      </Pressable>
      <Pressable style={() => [
        styles.touchable,
        activeButton2 && styles.buttonPressed
      ]} onPress={() => { 
        setActiveButton1(false)
        setActiveButton2(true)
        setActiveButton3(false)
        navigation.navigate('Cooks')}}>
        <Image style={styles.link} source={menubook} />
      </Pressable>
      <Pressable style={() => [
        styles.touchable,
        activeButton3 && styles.buttonPressed
      ]} onPress={() => { 
        setActiveButton1(false)
        setActiveButton2(false)
        setActiveButton3(true)
        navigation.navigate('Cooks')}}>
        <Image style={styles.link} source={account} />
      </Pressable>
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
  buttonPressed: {
    paddingLeft: 15,
    paddingRight: 15,
  }
});

export default NavBar;

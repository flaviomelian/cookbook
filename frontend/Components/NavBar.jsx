import { useState } from 'react'
import { View, Pressable, StyleSheet, Image } from 'react-native';
import home from '../assets/home.png';
import account from '../assets/account.png';
import dashboard from '../assets/dashboard.png';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NavBar = () => {

  const navigation = useNavigation();
  const [activeButton1, setActiveButton1] = useState(false);
  const [activeButton2, setActiveButton2] = useState(false);
  const [activeButton3, setActiveButton3] = useState(false);
  const { token } = useAuth();

  const handleHomePress = async () => {
    setActiveButton1(true);
    setActiveButton2(false);
    setActiveButton3(false);

    const token = await AsyncStorage.getItem('token');
    if (!token) navigation.navigate('Home');
    else navigation.navigate('Feed');
  };

  const handleDashboardPress = async () => {
    setActiveButton1(false);
    setActiveButton2(true);
    setActiveButton3(false);

    const token = await AsyncStorage.getItem('token');
    if (!token) navigation.navigate('Cooks');
    else navigation.navigate('Main');
  };

  const handleProfilePress = async () => {
    setActiveButton1(false);
    setActiveButton2(false);
    setActiveButton3(true);
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.navbar}>
      <Pressable style={() => [
        styles.touchable,
        activeButton1 && styles.buttonPressed
      ]} onPress={() => {
        setActiveButton1(true)
        setActiveButton2(false)
        setActiveButton3(false)
        handleHomePress()
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
        handleDashboardPress()
      }}>
        <Image style={styles.link} source={dashboard} />
      </Pressable>
      <Pressable style={() => [
        styles.touchable,
        activeButton3 && styles.buttonPressed
      ]} onPress={() => {
        setActiveButton1(false)
        setActiveButton2(false)
        setActiveButton3(true)
        handleProfilePress()
      }}>
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

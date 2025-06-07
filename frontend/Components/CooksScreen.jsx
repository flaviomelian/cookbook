import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cooks from './Cooks.jsx'; // Assuming Cooks.jsx is the component that displays the Cooks

const CooksScreen = () => {
  return (
    <View style={styles.container}>
      <Cooks />
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
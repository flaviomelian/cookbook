import {React, useEffect, useState} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { getAllCooks } from '../services/cookService.js'
import icon from '../assets/cook.png'; // Importar Image desde react-native

const Cooks = () => {

  const [cooks, setCooks] = useState([''])
  useEffect(() => {
    const fetchCooks = async () => {
      try {
        const data = await getAllCooks();
        setCooks(data);
      } catch (error) {
        console.error('Error fetching cooks:', error);
      }
    };
    fetchCooks();
  }, []);

  return (
    <View>
      <Text style={styles.title}>RECETAS</Text>
      {cooks.map((cook, index) => (
        <View style={styles.cook} key={index}>
          <Image source={icon}/>
          <Text style={styles.listItem}>{cook.name}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.addCook} onPress={() => console.log('Add Cook')}>
        <Image source={icon}/>
        <Text style={styles.textButton}>Añadir receta</Text>
      </TouchableOpacity>
        
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  listItem: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  cook: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  addCook: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#003f8e',
    padding: 10,
    borderRadius: 5,
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
});

export default Cooks

import {act, React, useEffect, useState} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { getAllCooks } from '../services/cookService.js'
import icon from '../assets/cook.png'; 
import trash from '../assets/delete.png'; 
import update from '../assets/edit.png'; 
import info from '../assets/info.png'; 

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
    <View style={{backgroundColor: '#035290', padding: 20, borderRadius: 10}}>
      <Text style={styles.title}>RECETAS</Text>
      {cooks.map((cook, index) => (
        <View style={styles.cook} key={index}>
          <Image source={icon} style={{marginRight: 10}}/>
          <Text style={styles.listItem}>{cook.name}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => console.log('View Cook', cook.id)}>    
              <Image source={info}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Update Cook', cook.id)}>    
              <Image source={update}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Delete Cook', cook.id)}>    
              <Image source={trash}/>
            </TouchableOpacity>
          </View>
          
        </View>
      ))}
      <TouchableOpacity style={styles.addCook} onPress={navigator => navigator.navigate('AddCook')}>
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
    marginVertical: 5, 
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
    marginLeft: 20
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
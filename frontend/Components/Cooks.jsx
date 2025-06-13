import { React, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getAllCooks, deleteCook } from '../services/cookService.js';
import icon from '../assets/cook.png';
import trash from '../assets/delete.png';
import update from '../assets/edit.png';
import info from '../assets/info.png';

const Cooks = () => {

  const [cooks, setCooks] = useState([]);
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(true);

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
  }, [refresh]);

  // luego en delete:
  const handleDelete = async (id) => {
    await deleteCook(id);
    setRefresh(prev => !prev); // fuerza un cambio para refrescar
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>RECETAS</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {cooks.map((cook, index) => (
          <View style={styles.cook} key={index}>
            <Image source={icon} style={{ marginRight: 10 }} />
            <Text style={styles.listItem}>{cook.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => navigation.navigate('CookDetails', { cook })}>
                <Image source={info} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('AddUpdateCook', { cook })}>
                <Image source={update} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(cook.id)}>
                <Image source={trash} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      { /* Aqui añadiria */}
      <TouchableOpacity style={styles.addCook} onPress={() => navigation.navigate('AddUpdateCook')}>
        <Image source={icon} />
        <Text style={styles.textButton}>Añadir receta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '60%',
    backgroundColor: '#003f8e',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0070f0',
    textAlign: 'center',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000166',
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
    marginLeft: 20,
  },
  addCook: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#000f5f',
    padding: 10,
    borderRadius: 5,
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
});

export default Cooks;

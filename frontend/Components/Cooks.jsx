import { React, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getAllCooks, deleteCook, getCooksFromUser } from '../services/cookService.js';
import icon from '../assets/cook.png';
import trash from '../assets/delete.png';
import update from '../assets/edit.png';
import info from '../assets/info.png';

const Cooks = ({ userId }) => {

  const [cooks, setCooks] = useState([]);
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchCooks = async () => {
      try {
        const data = userId ? await getCooksFromUser(userId) : await getAllCooks();
        setCooks(data);
      } catch (error) {
        console.error('Error fetching cooks:', error);
      }
    };
    fetchCooks();
  }, [refresh]);

  const handleDelete = async (id) => {
    await deleteCook(id);
    setRefresh(prev => !prev); // fuerza un cambio para refrescar
  };


  return (
    <View style={styles.container}>
      {userId ? (<Text style={styles.title}>MIS RECETAS</Text>) : (<Text style={styles.title}>RECETAS DE LA COMUNIDAD</Text>)}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {cooks.map((cook, index) => (
          <View style={styles.cook} key={index}>
            {userId ? (<Image source={icon} style={{ marginRight: 10 }} />) : (<Image source={icon} style={{ marginLeft: 20, marginRight: 10 }} />)}
            {userId ? (<Text style={styles.listItem}>{cook.name}</Text>):(<Text style={[styles.listItem, { marginLeft: 25 }]}>{cook.name}</Text>)}
            {userId ? (
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
            ) : (
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => navigation.navigate('CookDetails', { cook })}>
                  {userId ? (<Image source={info} style={{ marginRight: 10 }} />) : (<Image source={info} style={{ marginLeft: 20 }} />)}
                </TouchableOpacity>
              </View>)}
          </View>)
        )}
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
    fontSize: 23,
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
    marginLeft: 5,
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

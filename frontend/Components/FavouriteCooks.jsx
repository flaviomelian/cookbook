import { use, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllCooks, deleteCook, getCooksFromUser, getCooksSortByRate, getRatedCooksFromUser } from '../services/cookService.js';
import icon from '../assets/cook.png';
import trash from '../assets/delete.png';
import upward from '../assets/arrow_upward.png';
import downward from '../assets/arrow_downward.png';
import rate from '../assets/rate.png'
import update from '../assets/edit.png';
import info from '../assets/info.png';
import { useAuth } from '../Context/AuthContext';
import { getFavourites } from '../services/userService.js';

const FavouriteCooks = ({ route }) => {

    const [cooks, setCooks] = useState([]);
    const navigation = useNavigation();
    const [refresh, setRefresh] = useState(true);
    const { token } = useAuth();
    const userId = route.params.id;

    useEffect(() => {
        const fetchCooks = async () => {
            try {
                let data = await getFavourites(userId, token);
                console.log('Cooks fetched:', data, userId);
                setCooks(data);
            } catch (error) {
                console.error('Error fetching cooks:', error);
            }
        };

        fetchCooks();
    }, [refresh, userId]);



    const handleDelete = async (id) => {
        await deleteCook(id);
        setRefresh(prev => !prev); // fuerza un cambio para refrescar
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#008AE1' }}>
            <View style={styles.container}>
                <Text style={styles.title}>RECETAS FAVORITAS</Text>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    {cooks.map((cook, index) => (
                        <View style={styles.cook} key={index}>
                            {userId ? (<Image source={icon} style={{ marginRight: 10 }} />) : (<Image source={icon} style={{ marginLeft: 20, marginRight: 10 }} />)}
                            {userId ? (<Text style={styles.listItem}>{cook.name}</Text>) : (<Text style={[styles.listItem, { marginLeft: 25 }]}>{cook.name}</Text>)}
                            <View style={styles.actions}>
                                <TouchableOpacity onPress={() => navigation.navigate('CookDetails', { cook })}>
                                    {userId ? (<Image source={info} style={{ marginRight: 10 }} />) : (<Image source={info} style={{ marginLeft: 20 }} />)}
                                </TouchableOpacity>
                            </View>
                        </View>)
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '55%',
        backgroundColor: '#003f8e',
        padding: 20,
        borderRadius: 10,
        margin: 7.5,
        marginTop: 120,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#0070f0',
        textAlign: 'center',
        marginBottom: 10,
    },
    rating: {
        fontSize: 15,
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
        justifyContent: 'space-evenly',
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
});

export default FavouriteCooks;

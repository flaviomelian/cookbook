import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllCooks } from '../services/cookService';
import StarRating from './StarRating.jsx'
import { useAuth } from '../Context/AuthContext';

const Feed = () => {

    const navigation = useNavigation();
    const [cooks, setCooks] = useState([]);
    const { token } = useAuth(); 

    useEffect(() => {
        const fetchCooks = async () => {
            try {
                const data = await getAllCooks(token);
                setCooks(data);
            } catch (error) {
                console.error('Error fetching cooks:', error);
            }
        };
        fetchCooks();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Feed</Text>
            <Text style={styles.subtitle}>Recetas recientes y recomendaciones para ti</Text>

            {cooks.map((cook, index) => (
                <View style={styles.cook} key={index}>
                    <Text style={styles.recipeTitle}>{cook.name}</Text>
                    <StarRating rating={cook.rating}/>
                    <Text style={styles.recipeDesc}>{cook.description}</Text>
                </View>))
            }

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AddUpdateCook')}
            >
                <Text style={styles.buttonText}>Crear nueva receta</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 90,
        backgroundColor: '#008AE1',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#000166',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#000166',
        marginBottom: 20,
        textAlign: 'center',
    },
    cook: {
        flexDirection: 'column',
        backgroundColor: '#003f8e',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 15,
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#70a1ff',
    },
    recipeAuthor: {
        fontSize: 14,
        color: '#a0a8d0',
        marginBottom: 5,
    },
    recipeDesc: {
        fontSize: 14,
        color: '#d0d8ff',
    },
    button: {
        backgroundColor: '#000166',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
});

export default Feed;

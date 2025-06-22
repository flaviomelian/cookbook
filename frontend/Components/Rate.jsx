import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const Rate = () => {

    const [maxRating, setMaxRating] = useState(5);
    const [currentRating, setCurrentRating] = useState(0);

    const handleRate = (rating) => {
        if (currentRating === rating) setCurrentRating(0);
        else setCurrentRating(rating);
    };

    return (
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {[...Array(maxRating)].map((_, index) => (
                    <TouchableOpacity key={index} onPress={() => handleRate(index + 1)}>
                        <Text style={{ fontSize: 32, color: currentRating >= index + 1 ? '#FFD700' : '#d6d15a', marginHorizontal: 5 }}>
                            {index < currentRating ? '★' : '☆'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {currentRating > 0 && (
            <TouchableOpacity style={styles.button} onPress={() => setCurrentRating(0)}>
                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
                    Confirmar
                </Text>
            </TouchableOpacity>)}
        </View>
    )
}

export default Rate

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000166',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 15,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
})